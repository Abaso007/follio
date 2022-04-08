import { useState, useEffect, useContext } from "react"
import Link from "next/link";
import { generatePillBgColor, generateTextColor } from "../../constants/functions";
import { Socials } from "../socials";
import ProjectCard from "../projectCard";
import { AppContext } from "../../context/context";

const styles = {
    // pill: `bg-white border rounded-full px-3 py-1 m-1`,
    wrap: `flex items-center sm:justify-center flex-wrap px-5 pl-0`,
    previewMain: `m-auto 2xl container`,
    profilePhotoContainer: `sm:w-96 sm:h-96 w-full rounded-xl overflow-hidden relative bg-white mt-10 sm:mt-0`,
    profilePhoto: `object-cover h-full w-full rounded-xl`,
    header: `p-7 fixed top-0 bg-gray-800 w-screen z-20  `,
    headerWrapper: `flex items-center justify-between xl container m-auto w-full h-full`,
    headerLink: `m-3 hover:opacity-50`
    // closePreviewButton: `flex items-center justify-center p-2 sm:hidden`,
    // coverPhoto: `w-screen h-32 sm:h-72 object-cover`,
    // body: `min-h-screen bg-white overflow-y-scroll bg-gradient-to-tl from-rose-100 to-teal-100`,
    // sectionTitle: `font-bold text-2xl mb-5`,
}

const Style1 = ({ data }) => {

    const { increasePageViewCount } = useContext(AppContext)

    const [skills, setSkills] = useState([])
    const [fullname, setFullame] = useState("")
    const [tagline, setTagline] = useState("")
    const [about, setAbout] = useState("")
    const [work, setWork] = useState("")
    const [workplaces, setWorkplaces] = useState([])
    const [projects, setProjects] = useState([])
    const [showGithubStats, setShowGithubStats] = useState(false)
    const [socials, setSocials] = useState({})
    const [isPremiumAccount, setIsPremiumAccount] = useState(false)
    const [username, setUsername] = useState("")
    const [coverPhoto, setCoverPhoto] = useState('')
    const [profilePhoto, setProfilePhoto] = useState("")

    useEffect(() => {


        if (data && data) {
            setSkills(data.skills)
            setFullame(data.fullname)
            setTagline(data.tagline)
            setUsername(data.username)
            setWork(data.work)
            setSocials(data.socials)
            setAbout(data.about)
            setShowGithubStats(data.showGithubStats)
            setIsPremiumAccount(data.isPremiumAccount)
            setProfilePhoto(data.profilePhoto)
            setCoverPhoto(data.coverPhoto)
            setProjects(data.projects)

            try {
                document.querySelector(".theme-body").style.backgroundColor = data.themeColor
                document.querySelector(".theme-body").style.color = generateTextColor(data.themeColor)

                let skillPills = document.querySelectorAll(".skill-pill")

                skillPills.forEach(pill => {
                    pill.style.backgroundColor = "transparent"
                    pill.style.color = generateTextColor(themeColor)
                })

                increasePageViewCount(data)
            }

            catch (e) {

                console.log(e)
            }
        }

    }, [data])

    return <div className="theme-body min-h-screen w-screen">
        {/* HEADER */}
        <div className={styles.header}>
            <div className={styles.headerWrapper}>
                <p className="font-bold text-xl">{fullname}</p>
                <nav className="hidden sm:flex">
                    <a className={styles.headerLink} href="#">Home</a>
                    <a className={styles.headerLink} href="#about">About</a>
                    <a className={styles.headerLink} href="#projects">Projects</a>
                    <a className={styles.headerLink} href="#stats">Stats</a>
                    <a className={styles.headerLink} href="#skills">Skills</a>
                    <a className={styles.headerLink} href="#find-me">Find me</a>
                </nav>
            </div>
        </div>
        <div className={styles.previewMain}>

            {/* HERO */}
            <div className="sm:flex pt-56 justify-center items-center sm:h-screen py-32 sm:py-0 px-5 border-b border-b-[#27272767]">
                <div>
                    <p className="text-5xl max-w-4xl font-extrabold leading-tight sm:mr-20">{tagline}</p>
                    {
                        tagline === "" ?
                            <p className="sm:text-7xl text-5xl font-extrabold leading-tight sm:mr-10">{work}</p>
                            // <p className="sm:text-7xl text-5xl font-extrabold leading-tight sm:mr-10">{work}</p>
                            : <p className="my-10 text-3xl">{work}</p>
                    }
                    {
                        data && data ?
                            <div className="-ml-5 flex justify-start">
                                <Socials socials={socials} themeColor={data.themeColor} />
                            </div>
                            : <></>
                    }
                </div>
                <div>
                    {
                        profilePhoto ?
                            <div className={styles.profilePhotoContainer}>
                                <img className={styles.profilePhoto} src={profilePhoto} alt='' />
                            </div> : <img src={`https://avatars.dicebear.com/api/avataaars/:${fullname}.svg`} className="w-96 h-96 max-w-4xl" />
                    }
                </div>
            </div>

            {/* ABOUT */}
            {
                about ?
                    <div id="about" className="pb-56 px-5 sm:text-center max-w-6xl m-auto">
                        <p className="text-4xl font-bold border-b w-max sm:m-auto ml-0">ABOUT ME</p>
                        <br />
                        <p className="leading-10 text-2xl">{about}</p>
                        {/* <p className="text-xl sm:text-3xl about-text leading-10">{about}</p> */}
                    </div>
                    : <></>
            }

            {/* SKILLS */}
            {
                skills.length > 0 ?
                    <div id="skills" className="py-20 px-5 border-b border-b-[#27272767] sm:text-center max-w-6xl m-auto">
                        <p className="text-4xl font-bold border-b w-max sm:m-auto ml-0">MY SKILLS</p>
                        <br />
                        <ul className={styles.wrap}>
                            {
                                skills.map((skill, index) => {
                                    return <li key={index} className="skill-pill sm:text-2xl rounded-full px-4 py-2 hover:opacity-50 transition sm:m-3 m-3">{skill}</li>
                                })
                            }
                        </ul>
                    </div>
                    : <></>
            }

            {/* PROJECTS */}
            {
                projects.length > 0 ?
                    <div id="projects" className="py-20 px-5 border-b border-b-[#27272767] sm:text-center max-w-6xl m-auto">
                        <p className="text-4xl font-bold border-b w-max sm:m-auto ml-0">PROJECTS</p>
                        <br />
                        <ul className="grid grid-cols-1 sm:grid-cols-2">
                            {
                                projects.map((project, index) => {
                                    return <ProjectCard editMode={false} key={index} index={index} description={project.description} thumbnail={project.thumbnail} name={project.name} link={project.link} />
                                })
                            }
                        </ul>
                    </div>
                    : <></>
            }

            {/* GITHUB STATS */}
            {
                showGithubStats && socials.github ?
                    <div id="stats" className="py-20 px-5 border-b border-b-[#27272767] sm:text-center max-w-6xl m-auto">
                        <p className="text-4xl font-bold border-b w-max sm:m-auto ml-0">MY GITHUB STATS</p>
                        <br />
                        <img alt='' style={{ width: "100%", margin: "auto", marginBottom: "16px", borderRadius: "10px" }} src={`https://github-readme-stats.vercel.app/api?username=${socials.github}&show_icons=true&hide=&count_private=true&title_color=3382ed&text_color=ffffff&icon_color=3382ed&bg_color=1c1917&hide_border=true&show_icons=true`} />
                    </div> : <></>
            }

            {/* DONATIONS & TIPS */}
            {
                isPremiumAccount && socials.coffee.trim() !== "" ?
                    <div id="donate" className="py-20 px-5 border-b border-b-[#27272767] sm:text-center max-w-6xl m-auto">
                        <p className="text-4xl font-bold border-b w-max sm:m-auto ml-0">WANT TO DONATE?</p>
                        <br />
                        <div className="sm:flex justify-center">
                            <a href={`https://www.buymeacoffee.com/${socials.coffee}`}>
                                <img alt="" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="200" />
                            </a>
                        </div>
                    </div> : <div></div>
            }

            {/* FOOTER */}
            {
                data && data ?
                    <div id="find-me" className="py-10 sm:text-center max-w-6xl m-auto flex sm:justify-center">
                        <Socials socials={socials} themeColor={data.themeColor} />
                    </div>
                    : <></>
            }

            {/* MADE WITH FOLIO */}
            <div className="py-20 px-5 -mt-10 pt-10 sm:text-center max-w-6xl m-auto">
                <a href="https://folio.vercel.app" className="opacity-50">Made with 💛 by Folio</a>
            </div>
        </div>
    </div >
}

export default Style1