export interface AiModelDto {
    id: { value: string };
    name: string;
    description: string;
    aiVersion: string;
    modelType: string;
    isActive: boolean;
    provider: { value: string };
    capabilities: string;
}

export interface GetModelsResponseDto {
    models: AiModelDto[];
}
