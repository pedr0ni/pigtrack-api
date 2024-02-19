export type TrackingResponse = {
  codigo: string;
  eventos: {
    data: string;
    hora: string;
    local: string;
    status: string;
  }[];
  quantidade: number;
};
