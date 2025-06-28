import { useState, FormEvent } from "react";
import { useGetUserReviewQuery, useSendReviewMutation } from "../services/review";


export const useReviewSector = (userId: number) => {

    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [kinoId, setKinoId] = useState<number>(0);

    const [send, {error, isLoading}] = useSendReviewMutation();

    const {refetch} = useGetUserReviewQuery(userId, {skip: !userId});

    const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await send({kinopoiskId: kinoId, content, title}).unwrap();
            await refetch();
            setContent('');
            setTitle('');
        } catch (error) {
            console.log(error);
        }
    }

    return {content, title, kinoId, setContent, setTitle, setKinoId, handlerSubmit, error, isLoading }
}