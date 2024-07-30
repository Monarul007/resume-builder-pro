import { useEffect, useState } from "react";
import "../../index.css"

const Resume1 = ({ userData, numberOfPages }) => {
    console.log(userData);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [hobbies, setHobbies] = useState([]);

    useEffect(() => {
        if (
            (userData.user.info.avatar &&
                userData.user.info.avatar instanceof Blob) ||
            userData.user.info.avatar.startsWith("blob:")
        ) {
            setProfilePhoto(userData.user.info.avatar);
        } else {
            if (userData.user.info.avatar) {
                if (userData.user.info.avatar == "default.png") {
                    setProfilePhoto("/logo512.png");
                } else {
                    setProfilePhoto(`/logo512.png`);
                }
            }
        }
        if (userData.hobbies && userData.hobbies.content) {
            const content = userData.hobbies.content;
            const separatedArray = content.split(",");
            setHobbies(separatedArray);
        }
    }, [userData]);

    return (
        <div
            className="relative resume-5 mx-auto p-8 flex gap-10 break-inside-avoid items-start justify-start"
            style={{
                minHeight: numberOfPages ? `${numberOfPages * 297}mm` : "297mm",
                width: "210mm",
                backgroundImage: `url(${'/images/Creative-4-bg.png'})`,
                backgroundSize: "contain",
                backgroundRepeat: 'repeat',
            }}
        >
            <div className="w-[50%]">
                {userData?.sections.map((section) => section.type == "profile" && section.status == 1 && (
                    <section className="mb-8" key={section.id}>
                        <section className="resume-owner-info mb-8">
                            <div className="mb-12">
                                <h1
                                    className="font-inter text-4xl font-semibold mb-2"
                                    style={{ color: userData.templateColor ? userData.templateColor : "#333333" }}
                                >
                                    {userData?.user?.firstName}{" "}
                                    {userData?.user?.lastName}{" "}
                                </h1>
                                <h4 className="font-inter text-xl text-[#333333]">
                                    {userData?.job_title}
                                </h4>
                            </div>

                            <div>
                                <h3 className="text-base font-bold capitalize mt-0 mb-3 pb-2 border-b-2" style={{ color: userData.templateColor ? userData.templateColor : "#333333", borderColor: userData.templateColor ? userData.templateColor : "#333333" }}>
                                    {section?.name}
                                </h3>

                                <div
                                    className="text-[#333333] text-xs leading-6"
                                    dangerouslySetInnerHTML={{
                                        __html: userData
                                            ?.professional_summary
                                            ?.content,
                                    }}
                                ></div>
                            </div>
                        </section>
                    </section>
                ))}

                <div className="flex flex-wrap">

                    {/*============ Skills Start ============*/}
                    {userData?.sections.map((section, index) => section.type == "expertise" && section.status == 1 && (
                        <section key={index} className="w-full mb-8 last:mb-0 break-inside-avoid" style={{ order: section.order }}>

                            <h3 className="text-base font-bold capitalize mt-0 mb-3 pb-2 border-b-2"
                                style={{
                                    color: userData.templateColor ? userData.templateColor : "#333333",
                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                }}>
                                {section?.name}
                            </h3>

                            {/* Normal Style */}
                            {!userData.showExpertiseLevel &&
                                <div className="normal-style">
                                    <ul className="px-3">
                                        {
                                            userData?.skills.map((skill, index) => (
                                                <li key={index} className='text-[#333333] leading-6 mb-2 last:mb-0 list-disc break-inside-avoid'>{skill?.skill}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            }

                            {/* Progressbar Style */}
                            {userData.showExpertiseLevel &&
                                <div className="progress-style">
                                    <div className="">
                                        {
                                            userData?.skills.map((skill) => (
                                                <div key={skill.id} className='mb-3 last:mb-0 break-inside-avoid'>
                                                    {
                                                        skill.level === "Novice" &&
                                                        <div className="flex justify-between">
                                                            <p className='text-[#333333] leading-6 m-0'>{skill?.skill}</p>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                    style={{
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                    style={{
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                    style={{
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                    style={{
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        skill.level === "Beginner" &&
                                                        <div className="flex justify-between">
                                                            <p className='text-[#333333] leading-6 m-0'>{skill?.skill}</p>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                    style={{
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                    style={{
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                    style={{
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        skill.level === "Skillful" &&
                                                        <div className="flex justify-between">
                                                            <p className='text-[#333333] leading-6 m-0'>{skill?.skill}</p>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                    style={{
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                    style={{
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        skill.level === "Experienced" &&
                                                        <div className="flex justify-between">
                                                            <p className='text-[#333333] leading-6 m-0'>{skill?.skill}</p>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                    style={{
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        skill.level === "Expert" &&
                                                        <div className="flex justify-between">
                                                            <p className='text-[#333333] leading-6 m-0'>{skill?.skill}</p>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                                <div className="w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                        borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            ))

                                        }
                                    </div>
                                </div>
                            }

                        </section>
                    ))}
                    {/*============ Skills End ============*/}


                    {/*============ Key Skill / Tools Start ============*/}
                    {userData?.sections.map((section, index) => section.type === "tool" && section?.status === 1 && (
                        <section
                            key={index}
                            className="w-full mb-8 last:mb-0 break-inside-avoid"
                            style={{ order: section?.order }}
                        >
                            <h3 className="text-base font-bold capitalize mt-0 mb-3 pb-2 border-b-2"
                                style={{
                                    color: userData.templateColor ? userData.templateColor : "#333333",
                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                }}
                            >
                                {section?.name}
                            </h3>

                            <ul className="px-4">
                                {userData?.tools?.map((tool, index) => (
                                    <li
                                        key={index}
                                        className="text-[#333333] text-xs leading-6 list-disc mb-2 last:mb-0 break-inside-avoid"
                                    >
                                        {tool?.tool}
                                    </li>

                                ))}
                            </ul>
                        </section>
                    ))}
                    {/*============ Key Skill / Tools End ============*/}


                    {/*============ Contact Info Start ============*/}
                    <section className="social-icons pt-4 z-10 mb-8 last:mb-0">

                        <h3 className="text-base font-bold capitalize mt-0 mb-3 pb-2 border-b-2"
                            style={{
                                color: userData.templateColor ? userData.templateColor : "#333333",
                                borderColor: userData.templateColor ? userData.templateColor : "#333333"
                            }}
                        >
                            Contact
                        </h3>

                        <div className="flex items-center gap-2 mb-3 last:mb-0">
                            <p className="text-[#333333] text-xs my-0">
                                {userData?.user?.phone}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 mb-3 last:mb-0">
                            <p className="text-[#333333] text-xs my-0">
                                {userData?.user?.email}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 mb-3 last:mb-0">
                            <p className="text-[#333333] text-xs my-0">
                                {userData?.user?.info?.address}
                            </p>
                        </div>

                        {userData?.user?.info?.website && (
                            <div className="flex items-center gap-2 mb-3 last:mb-0">
                                <p className="text-[#333333] text-xs my-0">
                                    {userData?.user?.info?.website}
                                </p>
                            </div>
                        )}

                        {userData?.user?.info?.facebook && (
                            <div className="flex items-center gap-2 mb-3 last:mb-0">
                                <p className="text-[#333333] text-xs my-0">
                                    {userData?.user?.info?.facebook}
                                </p>
                            </div>
                        )}
                    </section>
                    {/*============ Contact Info End ============*/}


                    {/*============ Hobbies Start ============*/}
                    {userData?.sections.map((section, index) => section.type === "hobby" && section.status == 1 && (
                        <section key={index} className="w-full mb-8 last:mb-0 break-inside-avoid" style={{ order: section.order }}>
                            <h3 className="text-base font-bold capitalize mt-0 mb-3 pb-2 border-b-2"
                                style={{
                                    color: userData.templateColor ? userData.templateColor : "#333333",
                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                }}
                            >
                                {section?.name}
                            </h3>

                            <div className="">
                                <ul className="px-3">
                                    {hobbies?.map((hobby, index) => (
                                        <li
                                            key={index}
                                            className="text-[#333333] text-xs leading-6 list-disc mb-2 last:mb-0 break-inside-avoid"
                                        >
                                            {hobby}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    ))}
                    {/*============ Hobbies End ============*/}


                    {/*============ Languages Start ============*/}
                    {userData?.sections.map((section, index) => section.type == "language" && section.status == 1 && (
                        <section key={index} className="w-full mb-8 last:mb-0 break-inside-avoid" style={{ order: section.order }}>

                            <h3 className="text-base font-bold capitalize mt-0 mb-3 pb-2 border-b-2"
                                style={{
                                    color: userData.templateColor ? userData.templateColor : "#333333",
                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                }}
                            >
                                {section?.name}
                            </h3>

                            {/* Normal Style */}
                            {!userData.showLanguageLevel && (
                                <div className="normal-style">
                                    <ul className="px-4">
                                        {userData?.languages.map(
                                            (language) => (
                                                <li
                                                    key={language.id}
                                                    className="text-[#333333] text-xs leading-6 list-disc mb-2 last:mb-0 break-inside-avoid"
                                                >
                                                    {language?.language}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* Progress Style */}
                            {userData.showExpertiseLevel &&
                                <div className="progress-style">
                                    <div className="">
                                        {userData?.languages.map((language, index) => (
                                            <div key={index} className='mb-3 last:mb-0 break-inside-avoid'>
                                                {
                                                    language.level === "Working Knowledge" &&
                                                    <div className="flex justify-between">
                                                        <p className='text-[#333333] leading-6 m-0'>{language?.language}</p>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-3 h-3 rounded-full border"
                                                                style={{
                                                                    backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                            <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                style={{
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                            <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                style={{
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                            <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                style={{
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    language.level === "Good" &&
                                                    <div className="flex justify-between">
                                                        <p className='text-[#333333] leading-6 m-0'>{language?.language}</p>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-3 h-3 rounded-full border"
                                                                style={{
                                                                    backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                            <div className="w-3 h-3 rounded-full border"
                                                                style={{
                                                                    backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                            <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                style={{
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                            <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                style={{
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    language.level === "Native Speaker" &&
                                                    <div className="flex justify-between">
                                                        <p className='text-[#333333] leading-6 m-0'>{language?.language}</p>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-3 h-3 rounded-full border"
                                                                style={{
                                                                    backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                            <div className="w-3 h-3 rounded-full border"
                                                                style={{
                                                                    backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                            <div className="w-3 h-3 rounded-full border"
                                                                style={{
                                                                    backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                            <div className="w-3 h-3 bg-transparent rounded-full border"
                                                                style={{
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    language.level === "Highly Proficient" &&
                                                    <div className="flex justify-between">
                                                        <p className='text-[#333333] leading-6 m-0'>{language?.language}</p>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-3 h-3 rounded-full border"
                                                                style={{
                                                                    backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                            <div className="w-3 h-3 rounded-full border"
                                                                style={{
                                                                    backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                            <div className="w-3 h-3 rounded-full border"
                                                                style={{
                                                                    backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                            <div className="w-3 h-3 rounded-full border"
                                                                style={{
                                                                    backgroundColor: userData.templateColor ? userData.templateColor : "#333333",
                                                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                        </section>
                    ))}
                    {/*============ Languages End ============*/}


                    {/*============ References Start ============*/}
                    {userData?.sections.map((section, index) => section.type == "reference" && section.status == 1 && (
                        <section key={index} className="w-full mb-8 last:mb-0 break-inside-avoid" style={{ order: section.order }}>

                            <h3 className="text-base font-bold capitalize mt-0 mb-3 pb-2 border-b-2"
                                style={{
                                    color: userData.templateColor ? userData.templateColor : "#333333",
                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                }}
                            >
                                {section?.name}
                            </h3>
                            {userData?.references.map((reference, index) => (
                                <div
                                    key={index}
                                    className="mb-3 last:mb-0 break-inside-avoid"
                                >
                                    <h4 className="text-sm font-medium text-[#333333] mx-0">
                                        {reference?.ref_name}
                                    </h4>
                                    <div className="text-[#333333] text-xs leading-6">

                                        {reference?.position &&
                                            <span>{reference?.position}</span>
                                        }
                                        {reference?.company &&
                                            <span>{" at "}{reference?.company}</span>
                                        }
                                    </div>

                                    <div className="social-box-container">
                                        {reference?.phone &&
                                            <div className="flex items-center gap-3">
                                                <p className="text-[#333333] text-xs leading-5 m-0">
                                                    Cell: {reference?.phone}
                                                </p>
                                            </div>
                                        }

                                        {reference?.email &&
                                            <div className="flex items-center gap-3">
                                                <p className="text-[#333333] text-xs leading-5 m-0">
                                                    Email:{" "}
                                                    {reference?.email}
                                                </p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            ))}
                        </section>
                    ))}
                    {/*============ References End ============*/}

                </div>
            </div>

            <div className="w-[50%]">
                <div className="flex flex-wrap">
                    {/*============ Experience Start ============*/}
                    {userData?.sections.map((section, index) => section.type == "experience" && section.status == 1 && (
                        <section
                            key={index}
                            className="w-full owner-experience mb-8 last:mb-0 break-inside-avoid"
                            style={{ order: section.order }}
                        >
                            <h3 className="text-base  font-bold capitalize mt-0 mb-3 pb-2 border-b-2"
                                style={{
                                    color: userData.templateColor ? userData.templateColor : "#333333",
                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                }}
                            >
                                {section?.name}
                            </h3>
                            {userData?.experiences.map((experience, index) => (
                                <div
                                    key={index}
                                    className="mb-5 last:mb-0 break-inside-avoid"
                                >
                                    <div className="mb-1 last:mb-0">
                                        {experience?.jobTitle &&
                                            <span className="section-title text-sm font-semibold leading-6 m-0">
                                                {experience?.jobTitle}
                                            </span>
                                        }
                                        {experience?.employer &&
                                            <span className="text-[#333333] text-sm font-semibold leading-6 m-0">
                                                {" | "}
                                                {experience?.employer}
                                            </span>
                                        }
                                        {experience?.city &&
                                            <span className="text-[#333333] text-sm font-semibold leading-6 m-0">
                                                <span>,</span>{" "}
                                                <span>{experience.city}</span>
                                            </span>
                                        }
                                    </div>

                                    <div className="mb-1 last:mb-0">
                                        <p className="text-xs text-[#333333] leading-6 m-0">
                                            {experience?.startDate}
                                            {" "} -{" "}
                                            {experience?.isCurrent === true ? "Present" : experience?.endDate}
                                        </p>
                                    </div>

                                    {experience?.description &&
                                        <div className="mb-1 last:mb-0">
                                            <div className="text-[#333333] text-xs leading-6 m-0 quill-editor-content"
                                                dangerouslySetInnerHTML={{ __html: experience?.description, }}
                                            ></div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </section>
                    ))}
                    {/*============ Experience End ============*/}


                    {/*============ Education Start ============*/}
                    {userData?.sections.map((section, index) => section.type == "education" && section.status == 1 && (
                        <section
                            key={index}
                            className="w-full owner-education mb-8 last:mb-0 break-inside-avoid"
                            style={{ order: section.order }}
                        >
                            <h3 className="text-base font-bold capitalize mt-0 mb-3 pb-2 border-b-2"
                                style={{
                                    color: userData.templateColor ? userData.templateColor : "#333333",
                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                }}
                            >
                                {section?.name}
                            </h3>

                            {userData?.educations.map((education, index) => (
                                <div
                                    key={index}
                                    className="mb-5 last:mb-0 break-inside-avoid"
                                >
                                    <div className="mb-1 last:mb-0">
                                        {education?.degree &&
                                            <span className="section-title  font-sm text-sm font-semibold leading-6 m-0">
                                                {education?.degree}
                                            </span>
                                        }
                                        {education?.school &&
                                            <span className="text-[#333333] text-sm font-semibold leading-6 m-0">
                                                {" | "} {education?.school}
                                            </span>
                                        }
                                        {education?.location &&
                                            <span className="text-[#333333] text-sm font-semibold leading-6 m-0">
                                                <span>,</span> {" "} <span>{education?.location}</span>
                                            </span>
                                        }
                                    </div>

                                    <div className="mb-1 last:mb-0">
                                        <p className="text-xs text-[#333333] leading-6 m-0">
                                            {education?.startDate}
                                            {" "} -{" "}
                                            {education?.isCurrent === true ? "Present" : education?.endDate}
                                        </p>
                                    </div>

                                    {education?.grade &&
                                        <div className="mb-1 last:mb-0">
                                            <span>
                                                CGPA: {education?.grade}
                                            </span>
                                        </div>
                                    }

                                    {education?.description &&
                                        <div className="mb-1 last:mb-0">
                                            <p className="text-[#333333] text-xs leading-6 m-0 quill-editor-content"
                                                dangerouslySetInnerHTML={{ __html: education?.description, }}
                                            ></p>
                                        </div>
                                    }
                                </div>
                            ))}
                        </section>
                    ))}
                    {/*============ Education End ============*/}

                    {/*============ Internships Start ============*/}
                    {userData?.sections.map((section, index) => section.type == "internship" && section.status == 1 && (
                        <section
                            key={index}
                            className="w-full owner-internship mb-8 last:mb-0 break-inside-avoid"
                            style={{ order: section.order }}
                        >
                            <h3 className="text-base font-bold capitalize mt-0 mb-3 pb-2 border-b-2"
                                style={{
                                    color: userData.templateColor ? userData.templateColor : "#333333",
                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                }}
                            >
                                {section?.name}
                            </h3>
                            {userData?.internships.map((internship, index) => (
                                <div
                                    key={index}
                                    className="mb-5 last:mb-0 break-inside-avoid"
                                >
                                    <div className="mb-1 last:mb-0">
                                        {internship?.job_title &&
                                            <span className="section-title text-sm font-semibold leading-6 m-0">
                                                {internship?.job_title}
                                            </span>
                                        }
                                        {internship?.employer &&
                                            <span className="text-[#333333] text-sm font-semibold leading-6 m-0">
                                                {" | "}
                                                {internship?.employer}
                                            </span>
                                        }
                                        {internship?.city &&
                                            <span className="text-[#333333] text-sm font-semibold leading-6 m-0">
                                                <span>,</span>{" "}
                                                <span>{internship.city}</span>
                                            </span>
                                        }
                                    </div>

                                    <div className="mb-1 last:mb-0">
                                        <p className="text-xs text-[#333333] leading-6 m-0">
                                            {internship?.startDate}
                                            {" "} -{" "}
                                            {internship?.isCurrent === true ? "Present" : internship?.endDate}
                                        </p>
                                    </div>

                                    {internship?.description &&
                                        <div className="mb-1 last:mb-0">
                                            <div className="text-[#333333] text-xs leading-6 m-0 quill-editor-content"
                                                dangerouslySetInnerHTML={{ __html: internship?.description, }}
                                            ></div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </section>
                    ))}
                    {/*============ Internships End ============*/}


                    {/*============ Courses Start ============*/}
                    {userData?.sections.map((section, index) => section.type == "course" && section.status == 1 && (
                        <section
                            key={index}
                            className="w-full owner-courses mb-8 last:mb-0 break-inside-avoid"
                            style={{ order: section.order }}
                        >
                            <h3 className="text-base font-bold capitalize mt-0 mb-3 pb-2 border-b-2"
                                style={{
                                    color: userData.templateColor ? userData.templateColor : "#333333",
                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                }}
                            >
                                {section?.name}
                            </h3>
                            {userData?.courses.map((course, index) => (
                                <div
                                    key={index}
                                    className="mb-5 last:mb-0 break-inside-avoid"
                                >
                                    <div className="mb-1 last:mb-0">
                                        {course?.course &&
                                            <span className="section-title text-sm font-semibold leading-6 m-0">
                                                {course?.course}
                                            </span>
                                        }
                                        {course?.institute &&
                                            <span className="text-[#333333] text-sm font-semibold leading-6 m-0">
                                                {" | "}
                                                {course?.institute}
                                            </span>
                                        }
                                    </div>

                                    <div className="mb-1 last:mb-0">
                                        <p className="text-xs text-[#333333] leading-6 m-0">
                                            {course?.startDate}
                                            {" "} -{" "}
                                            {course?.isCurrent === true ? "Present" : course?.endDate}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </section>
                    ))}
                    {/*============ Courses End ============*/}


                    {/*============ Extra Activities Start ============*/}
                    {userData?.sections.map((section, index) => section.type == "activity" && section.status == 1 && (
                        <section
                            key={index}
                            className="w-full owner-activities mb-8 last:mb-0 break-inside-avoid"
                            style={{ order: section.order }}
                        >
                            <h3 className="text-base font-bold capitalize mt-0 mb-3 pb-2 border-b-2"
                                style={{
                                    color: userData.templateColor ? userData.templateColor : "#333333",
                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                }}
                            >
                                {section?.name}
                            </h3>
                            {userData?.activities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="mb-5 last:mb-0 break-inside-avoid"
                                >
                                    <div className="mb-1 last:mb-0">
                                        {activity?.function_title &&
                                            <span className="section-title text-sm font-semibold leading-6 m-0">
                                                {activity?.function_title}
                                            </span>
                                        }
                                        {activity?.employer &&
                                            <span className="text-[#333333] text-sm font-semibold leading-6 m-0">
                                                {" | "}
                                                {activity?.employer}
                                            </span>
                                        }
                                        {activity?.city &&
                                            <span className="text-[#333333] text-sm font-semibold leading-6 m-0">
                                                <span>,</span>{" "}
                                                <span>{activity.city}</span>
                                            </span>
                                        }
                                    </div>

                                    <div className="mb-1 last:mb-0">
                                        <p className="text-xs text-[#333333] leading-6 m-0">
                                            {"("}
                                            {activity?.startDate}
                                            {" "} -{" "}
                                            {activity?.isCurrent === true ? "Present" : activity?.endDate}
                                            {")"}
                                        </p>
                                    </div>

                                    {activity?.description &&
                                        <div className="mb-1 last:mb-0">
                                            <div className="text-[#333333] text-xs leading-6 m-0 quill-editor-content"
                                                dangerouslySetInnerHTML={{ __html: activity?.description, }}
                                            ></div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </section>
                    ))}
                    {/*============ Extra Activities End ============*/}


                    {/*============ Custom Section Start ============*/}
                    {userData?.sections.map((section, index) => section.type == "custom" && section.status == 1 && (
                        <section
                            key={index}
                            className="w-full custom-section mb-8 last:mb-0 break-inside-avoid"
                            style={{ order: section.order }}
                        >
                            <h3 className="text-base font-bold capitalize mt-0 mb-3 pb-2 border-b-2"
                                style={{
                                    color: userData.templateColor ? userData.templateColor : "#333333",
                                    borderColor: userData.templateColor ? userData.templateColor : "#333333"
                                }}
                            >
                                {section?.name}
                            </h3>
                            {section?.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="mb-5 last:mb-0 break-inside-avoid"
                                >
                                    <div className="mb-1 last:mb-0">
                                        {item?.activity_title &&
                                            <span className="section-title text-sm font-semibold leading-6 m-0">
                                                {item?.activity_title}
                                            </span>
                                        }
                                        {item?.city &&
                                            <span className="text-[#333333] text-sm font-semibold leading-6 m-0">
                                                {", "}
                                                {item?.city}
                                            </span>
                                        }
                                    </div>

                                    <div className="mb-1 last:mb-0">
                                        <p className="text-xs text-[#333333] leading-6 m-0">
                                            {"("}
                                            {item?.startDate}
                                            {" "} -{" "}
                                            {item?.isCurrent === true ? "Present" : item?.endDate}
                                            {")"}
                                        </p>
                                    </div>

                                    {item?.description &&
                                        <div className="mb-1 last:mb-0">
                                            <div className="text-[#333333] text-xs leading-6 m-0 quill-editor-content"
                                                dangerouslySetInnerHTML={{ __html: item?.description, }}
                                            ></div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </section>
                    ))}
                    {/*============ Custom Section End ============*/}
                </div>
            </div>
        </div>
    );
};

export default Resume1;