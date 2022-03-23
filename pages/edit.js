import { useContext, useEffect } from "react"
import LoginComponent from "../components/auth/loginComponent"
import SignupComponent from "../components/auth/signupComponent"
import EditView from "../components/body"
import Header from "../components/header"
import { AppContext } from "../context/context"

const Edit = () => {
    // const router = useRouter()
    // const { isAuthenticated, readDataFromStorage } = useContext(AppContext)

    // useEffect(() => {

    //     readDataFromStorage()
    //     if (!isAuthenticated) router.push("/")

    // }, [isAuthenticated])

    const { isAuthenticated, showLogin, readDataFromStorage } = useContext(AppContext)

    useEffect(() => {
        readDataFromStorage()
    }, [])

    if (!isAuthenticated && showLogin) return <LoginComponent />
    if (!isAuthenticated && !showLogin) return <SignupComponent />

    else return <div>
        <Header />
        <EditView />
    </div>

    return <div></div>
}

export default Edit