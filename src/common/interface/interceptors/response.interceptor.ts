import { Injectable } from "@nestjs/common";
import { ExecutionContext, NestInterceptor, CallHandler } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ApiResponse } from "../interfaces/api-response.interface";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(data => ({
        status: context.switchToHttp().getResponse().statusCode,
        success: true,
        data,
        timestamp: new Date().toISOString(),
      }))
    );
  }
}