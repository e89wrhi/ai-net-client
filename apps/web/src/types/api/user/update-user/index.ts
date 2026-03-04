export interface UpdateUserRequestDto {
    name?: string;
    image?: string;
    status?: string;
}

export interface UpdateUserResponseDto {
    success: boolean;
    message: string;
}
