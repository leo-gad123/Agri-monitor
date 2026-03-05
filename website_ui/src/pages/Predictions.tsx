import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  Calendar,
  FileText,
  Image,
  RefreshCw,
} from "lucide-react";

interface Prediction {
  predicted_class: string;
  confidence: number;
  class_confidences: Record<string, number>;
  file_metadata: {
    filename: string;
    size: number;
  };
  processing_details: {
    input_shape: number[];
    prediction_shape: number[];
  };
  timestamp: string;
}

const statusConfig = {
  "Early Blight": {
    label: "Early Blight",
    className: "bg-warning text-warning-foreground",
  },
  "Late Blight": {
    label: "Late Blight",
    className: "bg-destructive text-destructive-foreground",
  },
  Healthy: {
    label: "Healthy",
    className: "bg-success text-success-foreground",
  },
};

export default function Predictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10); // Fixed page size
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const fetchPredictions = async (page: number = currentPage) => {
    try {
      //   setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/predictions?page=${page}&page_size=${pageSize}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch predictions: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      setPredictions(data.data || []);
      setTotalPages(data.pagination?.pages || 1);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching predictions:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setPredictions([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPredictions(currentPage);

    // Set up interval to fetch data every 30 seconds
    const intervalId = setInterval(() => {
      fetchPredictions(currentPage);
    }, 3000); // 3 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    fetchPredictions(currentPage);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatLastUpdated = (): string => {
    if (!lastUpdated) return "Never";

    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - lastUpdated.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }
  };

  const getConfidenceColor = (confidence: number): string => {
    const percentage = confidence * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Prediction History
            </h1>
            <p className="text-muted-foreground">
              View all potato disease detection results
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Last updated: {formatLastUpdated()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Scan Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Loading predictions...</span>
              </div>
            ) : predictions.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No predictions found
                </h3>
                <p className="text-muted-foreground">
                  There are no scan results to display yet. Upload an image to
                  get started.
                </p>
              </div>
            ) : (
              <>
                <ScrollArea className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>File</TableHead>
                        <TableHead>Predicted Class</TableHead>
                        <TableHead>Confidence</TableHead>
                        <TableHead>File Size</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {predictions.map((prediction, index) => {
                        const config = statusConfig[
                          prediction.predicted_class as keyof typeof statusConfig
                        ] || {
                          label: prediction.predicted_class,
                          className: "bg-secondary",
                        };

                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{formatDate(prediction.timestamp)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {prediction.file_metadata.filename}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={config.className}>
                                {config.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`font-medium ${getConfidenceColor(
                                  prediction.confidence
                                )}`}
                              >
                                {(prediction.confidence * 100).toFixed(2)}%
                              </span>
                            </TableCell>
                            <TableCell>
                              {formatFileSize(prediction.file_metadata.size)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </ScrollArea>

                {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
