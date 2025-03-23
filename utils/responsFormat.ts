import { ApiResponce } from "./types/type";

const sendResponse = <T>(
    { res, success, statut, message, data }: ApiResponce<T>,
): void => {
    res.status(statut).json({
        success,
        statut,
        message,
        data,
    } as ApiResponce<T>);
}

export { sendResponse };
