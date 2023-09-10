import { Product } from "../product";
import { ImportErrorResponse } from "./errorResponse";

export interface PostBatckResponse {
    update: (Product | ImportErrorResponse)[];
    create: (Product | ImportErrorResponse)[];
}

