import { WordpressService } from "@core/services/wp-service/wp-service.service";

export const  wordpressServiceMock: Partial<WordpressService> = {
uploadImagesToWordpress: jest.fn()
}