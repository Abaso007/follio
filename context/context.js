import { useRouter } from "next/dist/client/router"
import { useState, useEffect } from "react"
import { createContext } from "react"
import { signIn, signOut, useSession } from "next-auth/react"

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const { data: session } = useSession()

    const [viewCount, setViewCount] = useState(0)
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [tagline, setTagline] = useState("")
    const [username, setUsername] = useState("")
    const [work, setWork] = useState("")
    const [views, setViews] = useState(0)
    const [about, setAbout] = useState("")
    const [themeColor, setThemeColor] = useState("#ffffff")
    const [accentColor, setAccentColor] = useState("#fea82f")
    const [showGithubStats, setShowGithubStats] = useState(false)
    const [skills, setSkills] = useState([])
    const [workplaces, setWorkplaces] = useState([])
    const [coverPhoto, setCoverPhoto] = useState('')
    const [profilePhoto, setProfilePhoto] = useState("")
    const [isPremiumAccount, setIsPremiumAccount] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [showLogin, setShowLogin] = useState(true)
    const [showLoader, setShowLoader] = useState(false)
    const [showSettingsModal, setShowSettingsModal] = useState(false)
    const [showProjectModal, setShowProjectModal] = useState(false)
    const [coverPhotoPreview, setCoverPhotoPreview] = useState("")
    const [profilePhotoPreview, setProfilePhotoPreview] = useState("")
    const [projects, setProjects] = useState([])
    const [socials, setSocials] = useState({})
    const [theme, setTheme] = useState(1)
    const [cv, setCv] = useState("")
    const [isNewUser, setIsNewUser] = useState(false)
    const router = useRouter()

    const maxViewCount = 6

    const next = () => setViewCount(viewCount + 1)
    const previous = () => setViewCount(viewCount - 1)

    const toggleIsAuthenticated = (val) => {
        sessionStorage.setItem('isAuth', val)
        setIsAuthenticated(eval(val))
    }

    useEffect(() => {
        setShowPreview(true)

        // let now = new Date().toISOString()
        // let createdAt = '2022-04-19T23:03:26.756Z'

        // console.log(Date(now))
        // console.log(Date(createdAt))

    }, [session])

    const saveNewChangesToStorage = (data) => {
        sessionStorage.setItem("data", JSON.stringify(data))
    }

    const increasePageViewCount = async (data) => {
        data.views++
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/update-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/${username}`)
            alert("✅ Link copied")
        }

        catch (e) {
            console.log(e.message)
        }
    }

    const shareLink = async () => {
        try {
            await navigator.share({
                title: `Folio | ${fullname}`,
                text: 'Check out my Folio',
                url: `${process.env.NEXT_PUBLIC_APP_URL}/${username}`,
            })
        }

        catch (e) {
            console.log(e.message)
        }
    }

    const uploadFile = async (_file) => {
        try {

            const data = new FormData()

            const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/follio/upload"
            const CLOUDINARY_UPLOAD_PRESET = "follio_preset"

            data.append("file", _file)
            data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
            data.append("cloud_name", "follio")

            const res = await fetch(`${CLOUDINARY_URL}`, {
                method: "POST",
                body: data
            })

            const resData = await res.json()

            return resData.url
        }

        catch (e) {
            console.error('upload error', e.message)
            return null
        }
    }

    const updateAccount = async () => {

        try {
            let proceed = confirm("Do you want to save your changes?")
            let _profilePhoto = profilePhoto;
            let _coverPhoto = coverPhoto;

            if (!proceed) return

            setShowLoader(true)

            // console.log('profilePhotoPreview', profilePhotoPreview)
            // console.log('coverPhotoPreview', coverPhotoPreview)

            // const coverSession = sessionStorage.getItem('cover')
            // const profileSession = sessionStorage.getItem('profile')

            // if (coverSession === coverPhoto) {
            //     console.log("coverSession === coverPhoto")
            // }

            // if (profileSession === profilePhoto) {
            //     console.log("profileSession === profilePhoto")
            // }

            if (coverPhotoPreview) {
                console.log('cover changes')
                _coverPhoto = await uploadFile(coverPhotoPreview)

                setCoverPhoto(_coverPhoto)
            }

            if (profilePhotoPreview) {
                console.log('profile changed')
                _profilePhoto = await uploadFile(profilePhotoPreview)

                setProfilePhoto(_profilePhoto)
            }

            let _body = {
                "fullname": fullname,
                "cv": cv,
                "username": username,
                "email": email,
                "tagline": tagline,
                "work": work,
                "about": about,
                "showGithubStats": showGithubStats,
                "skills": skills,
                "isPremiumAccount": isPremiumAccount,
                "profilePhoto": _profilePhoto,
                "coverPhoto": _coverPhoto,
                "workplaces": workplaces,
                "projects": projects,
                "theme": theme,
                "views": views,
                "themeColor": themeColor,
                "accentColor": accentColor,
                "socials": socials,
                "updatedAt": new Date().toISOString(),
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/update-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(_body),
            })

            if (res.status !== 200) {
                setShowLoader(false)
                alert("An error occured. Please try again later.")
                return
            }

            setShowLoader(false)
            saveNewChangesToStorage(_body)

        } catch (e) {

            setShowLoader(false)
            alert("An error occured. Please try again later.")
            console.log(e.message)
        }
    }

    const prefill = (_source) => {

        sessionStorage.setItem("data", JSON.stringify(_source))

        setFullname(_source.fullname)
        setCv(_source.cv)
        setEmail(_source.email)
        setUsername(_source.username)
        setTagline(_source.tagline)
        setWork(_source.work)
        setViews(_source.views)
        setAbout(_source.about)
        setProfilePhoto(_source.profilePhoto)
        setCoverPhoto(_source.coverPhoto)
        setShowGithubStats(_source.showGithubStats)
        setSkills(_source.skills)
        setWorkplaces(_source.workplaces)
        setProjects(_source.projects)
        setIsPremiumAccount(_source.isPremiumAccount)
        setWorkplaces(_source.workplaces)
        setSocials(_source.socials)
        setTheme(_source.theme)
        setAccentColor(_source.accentColor)
        setThemeColor(_source.themeColor)
    }

    const changeThemeInSessionStorage = (index) => {
        console.log('New theme index, ', index)
        let _sessionData = JSON.parse(sessionStorage.getItem("data"))
        _sessionData.theme = index
        setTheme(index)
        saveNewChangesToStorage(_sessionData)
    }

    const saveColorToSession = (color, type) => {
        let _sessionData = JSON.parse(sessionStorage.getItem("data"))

        if (type === "themeColor") {
            _sessionData.themeColor = color
            setThemeColor(color)
        }

        if (type === "accentColor") {
            _sessionData.accentColor = color
            setAccentColor(color)
        }

        saveNewChangesToStorage(_sessionData)
    }

    const logout = () => {
        sessionStorage.removeItem("data")
        setIsNewUser(false)
        signOut()
    }

    const formatUsername = (name) => {
        return (name.split(/\s+/).join("")).toLocaleLowerCase()
    }

    const setSuggestedThemeColor = (tailwindColor) => {
        let hex = tailwindColor.replace("bg-", "").replace("[", "").replace("]", "")
        saveColorToSession(hex)
        setThemeColor(hex)
    }

    const uploadResume = async () => {

        const a = confirm("Do you want upload new resume?")
        if (!a) return

        setShowLoader(true)

        let _cv = await uploadFile(cv)
        setCv(_cv)

        setShowLoader(false)
    }

    const changeUsername = async () => {
        try {

            setShowLoader(true)

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/check-username-exists/${username}`, { method: "GET" })
            const data = await res.json()

            if (data.payload) {
                alert("username already exists")
                setShowLoader(false)
                return
            }

            await updateAccount()
            setShowLoader(false)
        }

        catch (e) {
            alert("An error occured. Please try again later.")
            setShowLoader(false)
            console.log(e.message)
        }
    }

    /** Create Account */
    const createAccount = async () => {

        console.warn('Creating new account...🦄', session)

        setIsNewUser(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/add-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: formatUsername(session.user.name),
                email: session.user.email,
                fullname: session.user.name,
                profilePhoto: session.user.image,
                createdAt: new Date().toISOString(),
                coverPhoto: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
            }),
        })

        const data = await res.json()

        if (!data.status) {
            alert(data.error)
            return
        }

        fetchDataFromDB(session.user.email)
    }

    const checkAuthStatus = async () => {

        if (!session) {
            /** When no user logged in */
            console.warn("not logged in at all")
            return false
        }

        if (session && session.user && !sessionStorage.getItem("data")) {
            /** Is logged in but no data */
            console.warn("session, no data")
            await fetchDataFromDB(session.user.email)
            return false
        }

        if (session && session.user && sessionStorage.getItem("data")) {
            /** when user is fully logged in */
            console.warn("logged in, data")
            return true
        }

        return false
    }

    const fetchDataFromDB = async (_email) => {
        try {
            console.warn("fetching data from DB", _email)
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-user/${_email}`, { method: "GET" })
            const data = await res.json()

            /** When account is not in DB, create new account */
            if (!data.status) {
                console.error("no user data in DB", data)
                await createAccount()
                return
            }

            // console.log('updatedAt', data.payload.updatedAt)
            // console.log('createdAt', data.payload.createdAt)

            /** show onboardng and get date difference-check f new user */

            prefill(data.payload)
        }

        catch (e) {
            console.log(e.message)
        }
    }

    const initAuthentication = async () => {
        try {

            if (!await checkAuthStatus()) {
                await signIn("google")
                return
            }

            router.replace("/account/edit")

        } catch (e) {

            // setShowLoader(false)
            alert("An error occured. Please try again later.")
            console.log(e.message)
        }
    }

    const getAllUsers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-all-users`, { method: "GET" })
            const data = await res.json()
            return data.payload
        }

        catch (e) {
            console.log(e.message)
            return []
        }
    }

    return <AppContext.Provider value={{
        viewCount, setViewCount,
        next,
        previous,
        getAllUsers,
        maxViewCount,
        fullname, setFullname,
        work, setWork,
        about, setAbout,
        themeColor, setThemeColor,
        skills, setSkills, email,
        isAuthenticated, toggleIsAuthenticated,
        showGithubStats, setShowGithubStats,
        showPreview, setShowPreview,
        isPremiumAccount,
        updateAccount, username,
        initAuthentication,
        showLogin, setShowLogin,
        prefill,
        showLoader, setShowLoader,
        coverPhotoPreview, setCoverPhotoPreview,
        coverPhoto, profilePhoto,
        profilePhotoPreview, setProfilePhotoPreview,
        theme, changeThemeInSessionStorage,
        saveColorToSession,
        socials, setSocials,
        projects, setProjects,
        uploadFile,
        tagline, setTagline,
        increasePageViewCount,
        views, shareLink, logout, copyLink,
        setSuggestedThemeColor,
        isNewUser, setIsNewUser, username, setUsername,
        formatUsername, setCv,
        changeUsername, checkAuthStatus, cv, accentColor,
        uploadResume,
        showSettingsModal, setShowSettingsModal,
        showProjectModal, setShowProjectModal,
    }}>
        {children}
    </AppContext.Provider>
}