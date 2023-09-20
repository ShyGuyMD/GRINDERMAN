import { WordpressService } from "@core/services/wp-service/wordpress.service";

export const  wordpressServiceMock: Partial<WordpressService> = {
uploadImagesToWordpress: jest.fn(),
postAdmin: jest.fn()
}