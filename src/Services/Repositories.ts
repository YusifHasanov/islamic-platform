import ArticleRepository from "./concretes/ArticleRepository";
import BookRepository from "./concretes/BookRepository";
import PlaylistRepository from "./concretes/PlaylistRepository";
import VideoRepository from "./concretes/VideoRepository";

export const playlistRepo = new PlaylistRepository();
export const videoRepo = new VideoRepository();
export const articleRepo = new ArticleRepository();
export const bookRepo = new BookRepository();