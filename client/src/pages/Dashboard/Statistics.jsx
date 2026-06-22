import { Helmet } from "react-helmet-async";
// TODO: import { Navigate } from "react-router-dom";
// TODO: import AdminStatistics from "../../components/AdminStatistics";
// TODO: import LoadingSpinner from "../../components/common/LoadingSpinner";
// TODO: import useRole from "../../hooks/useRole";

const Statistics = () => {
    // TODO: const [role, isLoading] = useRole();
    // if (role == "user") return <Navigate to="/" />;
    // if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            {/* TODO: {role === "admin" && <AdminStatistics />} */}
            <p>Dashboard Statistics - coming soon</p>
        </div>
    );
};

export default Statistics;
