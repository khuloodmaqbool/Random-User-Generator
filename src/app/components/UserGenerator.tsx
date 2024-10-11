import { useEffect, useState } from "react";
import { CiMail, CiPhone, CiUser, CiLocationOn } from "react-icons/ci";
import { PiUserPlusLight } from "react-icons/pi";

interface User {
    gender: string;
    name: {
        first: string;
        last: string;
    };
    email: string;
    location: {
        city: string;
        state: string;
        country: string;
    };
    login: {
        md5: string;
    };
    cell: string;
    picture: {
        large: string;
    };
}

// Define the ApiResponse interface
interface ApiResponse {
    results: User[];
}

export const UserGenerator = () => {
    const [apiData, setData] = useState<ApiResponse | null>(null);
    const [errorState, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [thankDiv, setThankDiv] = useState<boolean>(false);

    const handleUserGenerator = async () => {
        setLoading(true);
        setError(false);

        try {
            const api = `https://randomuser.me/api/`;
            const res = await fetch(api);

            if (!res.ok) {
                throw new Error("User not found");
            }

            const data: ApiResponse = await res.json();
            setData(data);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleUserGenerator();
    }, []);

    const handleAppreciateBtn = () => {
        setThankDiv(true);
        setTimeout(() => {
            setThankDiv(false);
        }, 2000);
    };

    const btnStyles = `bg-lightBlue text-white rounded-md px-3 py-2 my-7 text-lg`;
    const paraStyles = `flex items-center px-5 py-1`;
    const thankDivStyles = `absolute inset-0 w-full h-full bg-white opacity-90 flex justify-center items-center rounded-lg`;
    const mainHeadingStyles = `stroke-heading text-3xl mt-12 px-3 md:text-5xl lg:text-6xl text-center font-black`;

    return (
        <>
            {apiData && (
                <div className="flex flex-col items-center flex-nowrap w-full h-full" style={{ backgroundImage: "url('map.svg')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
                    <h1 style={{ fontFamily: "Anybody" }} className={`${mainHeadingStyles}`}>RANDOM USER GENERATOR</h1>
                    <button className={`${btnStyles}`} onClick={handleUserGenerator}>
                        {loading ? "...loading" : "Generate New User"}
                    </button>

                    {loading ? (
                        <div className="loader"></div>
                    ) : errorState ? (
                        <p style={{ color: "red" }}>Error: Could not fetch user data</p>
                    ) : (
                        <div className="w-4/5 max shadow-lg md:w-96 lg:w-96 mx-auto rounded-xl py-4 bg-white relative">
                            {thankDiv && (
                                <div className={`${thankDivStyles}`}>
                                    <h1 className="text-4xl text-lightBlue font-bold">Thank you</h1>
                                </div>
                            )}

                            <img className="mx-auto rounded-full w-52 h-52 my-3" src={apiData.results[0].picture.large} alt="User" />

                            <div className={`${paraStyles}`}>
                                <CiUser className="w-8 h-8" />
                                <h3 className="text-4xl font-bold text-center py-2">{apiData.results[0].name.first} {apiData.results[0].name.last}</h3>
                            </div>

                            <p className="bg-dullBlue text-center text-2xl mb-4 capitalize py-1">{apiData.results[0].gender}</p>

                            <div className={`${paraStyles}`}>
                                <CiMail style={{ color: "rgb(71 85 105)" }} className="mr-2 w-8 h-6 " />
                                <p>{apiData.results[0].email}</p>
                            </div>

                            <div className={`${paraStyles}`}>
                                <CiLocationOn style={{ color: "rgb(71 85 105)" }} className="mr-2 w-8 h-6 " />
                                <p>{apiData.results[0].location.city}, {apiData.results[0].location.state}, {apiData.results[0].location.country}</p>
                            </div>

                            <div className={`${paraStyles}`}>
                                <PiUserPlusLight style={{ color: "rgb(71 85 105)" }} className="mr-2 w-8 h-6 " />
                                <p>{apiData.results[0].login.md5}</p>
                            </div>

                            <div className={`${paraStyles}`}>
                                <CiPhone style={{ color: "rgb(71 85 105)" }} className="mr-2 w-8 h-6 " />
                                <p>{apiData.results[0].cell}</p>
                            </div>
                        </div>
                    )}
                    <button onClick={handleAppreciateBtn} className={`${btnStyles}`}>Appreciate Now</button>
                </div>
            )}
        </>
    );
};
