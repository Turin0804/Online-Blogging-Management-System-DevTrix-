import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Card from "../../components/Card";
import Container from "../../components/common/Container";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Articles = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: articles, isLoading } = useQuery({
        queryKey: ["articles", searchTerm],
        queryFn: async () => {
            const response = await axios(
                `${import.meta.env.VITE_API_URL}/approved-articles?search=${searchTerm}`
            );
            return response.data;
        },
    });
   