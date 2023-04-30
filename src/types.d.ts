
type videoIdType = string | string[] | undefined

type question ={
    question: string,
    answer: string,
    categoryId: number,
}


interface ToastProps {
    message: string;
    position?: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";
    autoClose?: number;
    hideProgressBar?: boolean;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
    draggable?: boolean;
    progress?: undefined;
    theme?: "light" | "dark";

}