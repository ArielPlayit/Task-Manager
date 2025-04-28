// api-task-operation.decorator.ts
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

interface TaskOperationOptions {
  summary: string;
  responses: Array<{ status: number; description: string }>;
}

export function ApiTaskOperation(options: TaskOperationOptions) {
  const decorators = [
    ApiOperation({ summary: options.summary }),
    ...options.responses.map(resp => ApiResponse(resp)),
  ];
  return applyDecorators(...decorators);
}
