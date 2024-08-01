import { useEffect, useState } from "react";
import { formatDate, applyTextColor } from "../helpers";
import { useFormContext, useWatch } from "react-hook-form";

const Resume2 = () => {

    const numberOfPages = 2;
    const { control } = useFormContext();
    const userData = useWatch({ control });

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [hobbies, setHobbies] = useState([]);

    useEffect(() => {
        if (userData.user.info.avatar && userData.user.info.avatar instanceof Blob || userData.user.info.avatar.startsWith('blob:')) {
            setProfilePhoto(userData.user.info.avatar);
        } else {
            if (userData.user.info.avatar) {
                if (userData.user.info.avatar == 'default.png') {
                    setProfilePhoto('/logo512.png');
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
        <div className="resume-5 p-8 flex gap-16 break-inside-avoid items-start justify-start" style={{
            minHeight: numberOfPages ? `${numberOfPages * 297}mm` : '297mm', background: 'linear-gradient(180deg, #FFFFFF 28%, #FFF2EA 100%)', backgroundSize: "210mm 297mm", backgroundRepeat: 'repeat', backgroundPosition: "top"
        }}>
            <div className='w-[30%]'>
                <section className="mb-8">
                    <div className="w-[160px]">
                        <img src={profilePhoto} onError={(e) => e.target.src = '/logo512.png'} />
                    </div>

                    <div className="social-icons relative pt-4 pb-2 z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="px-2">
                                <svg width="14" height="14" viewBox="0 0 18 18" fill={applyTextColor(userData.templateColor ? userData.templateColor : '#FF7D24')} xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.625 7.795C5.065 10.625 7.38 12.94 10.215 14.38L12.415 12.175C12.69 11.9 13.085 11.82 13.43 11.93C14.55 12.3 15.755 12.5 17 12.5C17.555 12.5 18 12.945 18 13.5V17C18 17.555 17.555 18 17 18C7.61 18 0 10.39 0 1C0 0.445 0.45 0 1 0H4.5C5.055 0 5.5 0.445 5.5 1C5.5 2.245 5.7 3.45 6.07 4.57C6.18 4.915 6.1 5.31 5.825 5.585L3.625 7.795Z" fill='' />
                                </svg>
                            </div>

                            <p className='text-[#576370] text-xs my-0'>{userData?.user?.phone}</p>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <div className="px-2">
                                <svg width="14" height="14" viewBox="0 0 22 16" fill={applyTextColor(userData.templateColor ? userData.templateColor : '#FF7D24')} xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.1111 0H3.88889C1.93334 0 0.333336 1.6 0.333336 3.55556V12.4444C0.333336 14.4 1.93334 16 3.88889 16H18.1111C20.0667 16 21.6667 14.4 21.6667 12.4444V3.55556C21.6667 1.6 20.0667 0 18.1111 0ZM19.5333 5.15556L12.5111 9.86667C12.0667 10.1333 11.5333 10.3111 11 10.3111C10.4667 10.3111 9.93334 10.1333 9.48889 9.86667L2.46667 5.15556C2.11111 4.88889 2.02222 4.35556 2.28889 3.91111C2.55556 3.55556 3.08889 3.46667 3.53334 3.73333L10.5556 8.44444C10.8222 8.62222 11.2667 8.62222 11.5333 8.44444L18.5556 3.73333C19 3.46667 19.5333 3.55556 19.8 4C19.9778 4.35556 19.8889 4.88889 19.5333 5.15556Z" fill='' />
                                </svg>
                            </div>

                            <p className='text-[#576370] text-xs my-0'>{userData?.user?.email}</p>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <div className="px-2">
                                <svg width="14" height="14" viewBox="0 0 14 20" fill={applyTextColor(userData.templateColor ? userData.templateColor : '#FF7D24')} xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 0C3.135 0 0 3.135 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.135 10.865 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z" fill="" />
                                </svg>
                            </div>

                            <p className='text-[#576370] text-xs my-0'>{userData?.user?.info?.address}</p>
                        </div>

                        {userData?.user?.info?.website &&
                            <div className="flex items-center gap-2 mb-2">
                                <div className="px-2">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill={applyTextColor(userData.templateColor ? userData.templateColor : '#FF7D24')} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 12H22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                                <p className='text-[#576370] text-xs my-0'>{userData?.user?.info?.website}</p>
                            </div>}

                        {userData?.user?.info?.facebook &&
                            <div className="flex items-center gap-2">
                                <div className="px-2">
                                    <i className="fa-brands fa-facebook-f pr-2" style={{ color: applyTextColor(userData.templateColor ? userData.templateColor : '#FF7D24') }}></i>
                                </div>

                                <p className='text-[#576370] text-xs my-0'>{userData?.user?.info?.facebook}</p>
                            </div>}

                        <div className="social-link-overlay absolute top-0 bottom-[-8px] left-0 w-[30px] z-[-1]" style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', color: applyTextColor(userData.templateColor ? userData.templateColor : '#FF7D24'), borderRadius: ' 0px 0px 100px 100px' }}></div>
                    </div>
                </section>


                <div className='flex flex-wrap'>
                    {/* For progress bar style -> show "progress-style" className & hide "normal-style" className;
                    For list style -> show "normal-style" className & hide "progress-style" className; */}

                    {/* Languages */}
                    {
                        userData?.sections.map((section) => (section.type == "language" && section.status == 1 &&
                            <section key={section.id} className='w-full mb-8 break-inside-avoid' style={{ order: section.order }}>
                                <h3 className="text-base text-[#1F2029] font-medium uppercase mt-0 mb-3">{section?.name}</h3>

                                {/* Normal Style */}
                                {!userData.showLanguageLevel &&
                                    <div className="normal-style mb-7">
                                        <ul className='px-3'>
                                            {
                                                userData?.languages.map((language) => (
                                                    <li key={language.id} className='text-[#576370] text-xs leading-6 list-disc mb-2 break-inside-avoid'>{language?.language}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>}

                                {/* Progress Style */}
                                {userData.showLanguageLevel &&
                                    <div className="progress-style">
                                        <div>
                                            {
                                                userData?.languages.map((language) => (
                                                    <>
                                                        <div key={language.id} className='mb-3 break-inside-avoid'>
                                                            {
                                                                language.level === "Working Knowledge" &&
                                                                <>
                                                                    <div className='flex justify-between mb-2'>
                                                                        <p key={language.id} className='text-[#576370] text-xs leading-6 m-0'>{language?.language}</p>
                                                                        <p className='text-[#576370] text-xs leading-6 m-0'>40%</p>
                                                                    </div>
                                                                    <div className="progress-bar relative w-full h-2 bg-[#DEDEDE] rounded-[100px]">
                                                                        <span className='w-full h-2 absolute left-0 right-0 top-0 bottom-0 rounded-[100px]' style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', width: '40%' }}></span>
                                                                    </div>
                                                                </>
                                                            }
                                                            {
                                                                language.level === 'Good' &&
                                                                <>
                                                                    <div className='flex justify-between mb-2'>
                                                                        <p key={language.id} className='text-[#576370] text-xs leading-6 m-0'>{language?.language}</p>
                                                                        <p className='text-[#576370] text-xs leading-6 m-0'>50%</p>
                                                                    </div>
                                                                    <div className="progress-bar relative w-full h-2 bg-[#DEDEDE] rounded-[100px]">
                                                                        <span className='w-full h-2 absolute left-0 right-0 top-0 bottom-0 rounded-[100px]' style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', width: '50%' }}></span>
                                                                    </div>
                                                                </>
                                                            }
                                                            {
                                                                language.level === 'Native Speaker' &&
                                                                <>
                                                                    <div className='flex justify-between mb-2'>
                                                                        <p key={language.id} className='text-[#576370] text-xs leading-6 m-0'>{language?.language}</p>
                                                                        <p className='text-[#576370] text-xs leading-6 m-0'>70%</p>
                                                                    </div>
                                                                    <div className="progress-bar relative w-full h-2 bg-[#DEDEDE] rounded-[100px]">
                                                                        <span className='w-full h-2 absolute left-0 right-0 top-0 bottom-0 rounded-[100px]' style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', width: '70%' }}></span>
                                                                    </div>
                                                                </>
                                                            }
                                                            {
                                                                language.level === 'Highly Proficient' &&
                                                                <>
                                                                    <div className='flex justify-between mb-2'>
                                                                        <p key={language.id} className='text-[#576370] text-xs leading-6 m-0'>{language?.language}</p>
                                                                        <p className='text-[#576370] text-xs leading-6 m-0'>95%</p>
                                                                    </div>
                                                                    <div className="progress-bar relative w-full h-2 bg-[#DEDEDE] rounded-[100px]">
                                                                        <span className='w-full h-2 absolute left-0 right-0 top-0 bottom-0 rounded-[100px]' style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', width: '95%' }}></span>
                                                                    </div>
                                                                </>
                                                            }

                                                        </div>
                                                    </>
                                                ))
                                            }
                                        </div>
                                    </div>}
                            </section>
                        ))
                    }


                    {/* Skills */}
                    {
                        userData?.sections.map((section) => (section.type == "expertise" && section.status == 1 &&
                            <section key={section.id} className='w-full mb-8 break-inside-avoid' style={{ order: section.order }}>
                                <h3 className="text-base text-[#1F2029] font-medium uppercase mt-0 mb-3">{section?.name}</h3>


                                {/* Normal Style */}
                                {!userData.showExpertiseLevel &&
                                    <div className="normal-style mb-7">
                                        <ul className='px-3'>
                                            {
                                                userData?.skills.map((skill) => (
                                                    <li key={skill.id} className='text-[#576370] text-xs leading-6 list-disc mb-2 break-inside-avoid'>{skill?.skill}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>}

                                {/* Progressbar Style */}
                                {userData.showExpertiseLevel &&
                                    <div className="progress-style">
                                        <div className="mb-8">
                                            {
                                                userData?.skills.map((skill) => (
                                                    <div key={skill.id} className='mb-3 break-inside-avoid'>
                                                        {
                                                            skill.level === "Beginner" &&
                                                            <>
                                                                <div className="flex justify-between mb-2">
                                                                    <p className='text-[#576370] text-xs leading-6 m-0'>{skill?.skill}</p>
                                                                    <p className='text-[#576370] text-xs leading-6 m-0'>40%</p>
                                                                </div>
                                                                <div className="progress-bar relative w-full h-2 bg-[#DEDEDE] rounded-[100px]">
                                                                    <span className='w-full h-2 absolute left-0 right-0 top-0 bottom-0 rounded-[100px]' style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', width: "40%" }}></span>
                                                                </div>
                                                            </>
                                                        }
                                                        {
                                                            skill.level === "Skillfull" &&
                                                            <>
                                                                <div className="flex justify-between mb-2">
                                                                    <p className='text-[#576370] text-xs leading-6 m-0'>{skill?.skill}</p>
                                                                    <p className='text-[#576370] text-xs leading-6 m-0'>60%</p>
                                                                </div>
                                                                <div className="progress-bar relative w-full h-2 bg-[#DEDEDE] rounded-[100px]">
                                                                    <span className='w-full h-2 absolute left-0 right-0 top-0 bottom-0 rounded-[100px]' style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', width: "60%" }}></span>
                                                                </div>
                                                            </>
                                                        }
                                                        {
                                                            skill.level === "Novice" &&
                                                            <>
                                                                <div className="flex justify-between mb-2">
                                                                    <p className='text-[#576370] text-xs leading-6 m-0'>{skill?.skill}</p>
                                                                    <p className='text-[#576370] text-xs leading-6 m-0'>70%</p>
                                                                </div>
                                                                <div className="progress-bar relative w-full h-2 bg-[#DEDEDE] rounded-[100px]">
                                                                    <span className='w-full h-2 absolute left-0 right-0 top-0 bottom-0 rounded-[100px]' style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', width: "70%" }}></span>
                                                                </div>
                                                            </>
                                                        }
                                                        {
                                                            skill.level === "Experienced" &&
                                                            <>
                                                                <div className="flex justify-between mb-2">
                                                                    <p className='text-[#576370] text-xs leading-6 m-0'>{skill?.skill}</p>
                                                                    <p className='text-[#576370] text-xs leading-6 m-0'>90%</p>
                                                                </div>
                                                                <div className="progress-bar relative w-full h-2 bg-[#DEDEDE] rounded-[100px]">
                                                                    <span className='w-full h-2 absolute left-0 right-0 top-0 bottom-0 rounded-[100px]' style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', width: "90%" }}></span>
                                                                </div>
                                                            </>
                                                        }
                                                    </div>
                                                ))

                                            }
                                        </div>
                                    </div>}
                            </section>
                        ))
                    }


                    {/* Hobbies */}
                    {
                        userData?.sections.map((section) => (section.type === "hobby" && section.status == 1 &&
                            <section key={section?.id} className='w-full mb-8 break-inside-avoid' style={{ order: section.order }}>
                                <h3 className="text-base text-[#1F2029] font-medium uppercase mt-0 mb-3">{section?.name}</h3>

                                <div className="mb-7">
                                    <ul className='px-3'>
                                        {
                                            hobbies?.map((hobby, index) => (
                                                <li key={index} className='text-[#576370] text-xs leading-6 list-disc mb-2 break-inside-avoid'>{hobby}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </section>
                        ))
                    }


                    {/* Key Skill / Tools */}
                    {
                        userData?.sections.map((section) => (section.type === "tool" && section?.status === 1 &&
                            <section key={section?.id} className="w-full mb-8 break-inside-avoid" style={{ order: section?.order }}>
                                <h3 className="text-base text-[#1F2029] font-medium uppercase mt-0 mb-3">{section?.name}</h3>

                                <ul className='px-3'>
                                    {
                                        userData?.tools?.map((tool) => (
                                            <li key={tool?.id} className='text-[#576370] text-xs leading-6 list-disc mb-2 break-inside-avoid'>{tool?.tool}</li>
                                        ))}
                                </ul>
                            </section>
                        ))
                    }


                    {/* References */}
                    {
                        userData?.sections.map((section) => (section.type == "reference" && section.status == 1 &&
                            <section key={section?.id} className='w-full mb-8 break-inside-avoid' style={{ order: section.order }}>
                                <h3 className="text-base text-[#1F2029] font-medium uppercase mt-0 mb-3">{section?.name}</h3>
                                {
                                    userData?.references.map((reference) => (
                                        <div key={reference.id} className='mb-7 break-inside-avoid'>
                                            <h4 className='text-sm font-medium text-[#1F2029] mt-0 mx-0 mb-1'>{reference?.ref_name}</h4>
                                            <p className='text-[#576370] text-xs leading-6 m-0'>{reference?.position} at {reference?.company}</p>

                                            <div className="social-box-container mt-2">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.625 7.795C5.065 10.625 7.38 12.94 10.215 14.38L12.415 12.175C12.69 11.9 13.085 11.82 13.43 11.93C14.55 12.3 15.755 12.5 17 12.5C17.555 12.5 18 12.945 18 13.5V17C18 17.555 17.555 18 17 18C7.61 18 0 10.39 0 1C0 0.445 0.45 0 1 0H4.5C5.055 0 5.5 0.445 5.5 1C5.5 2.245 5.7 3.45 6.07 4.57C6.18 4.915 6.1 5.31 5.825 5.585L3.625 7.795Z" fill="#576370" />
                                                    </svg>

                                                    <p className='text-[#576370] text-xs leading-6 m-0'>{reference?.phone}</p>
                                                </div>

                                                <div className="flex items-center gap-3 mb-2">
                                                    <svg width="14" height="14" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 0H4C1.8 0 0 1.8 0 4V14C0 16.2 1.8 18 4 18H20C22.2 18 24 16.2 24 14V4C24 1.8 22.2 0 20 0ZM21.6 5.8L13.7 11.1C13.2 11.4 12.6 11.6 12 11.6C11.4 11.6 10.8 11.4 10.3 11.1L2.4 5.8C2 5.5 1.9 4.9 2.2 4.4C2.5 4 3.1 3.9 3.6 4.2L11.5 9.5C11.8 9.7 12.3 9.7 12.6 9.5L20.5 4.2C21 3.9 21.6 4 21.9 4.5C22.1 4.9 22 5.5 21.6 5.8Z" fill="#576370" />
                                                    </svg>

                                                    <p className='text-[#576370] text-xs leading-6 m-0'>{reference?.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </section>
                        ))
                    }
                </div>
            </div>


            <div className='w-[70%]'>
                <div className="resume-owner-info mb-8">
                    <h1 className="font-inter text-2xl font-semibold mt-0 mb-1" style={{ color: userData.templateColor ? userData.templateColor : '#FF7D24' }}>{userData?.user?.firstName} {userData?.user?.lastName}</h1>
                    <h4 className="font-inter text-base text-[#576370] mt-0 mb-5">{userData?.job_title}</h4>

                    <p className='text-[#576370] text-xs leading-6' dangerouslySetInnerHTML={{ __html: userData?.professional_summary?.content }}></p>
                </div>


                <div className='flex flex-wrap'>

                    {/* Experience */}
                    {
                        userData?.sections.map((section) => (section.type == "experience" && section.status == 1 &&
                            <section key={section.id} className='w-full owner-experience mb-8 break-inside-avoid' style={{ order: section.order }}>
                                <h3 className="text-base text-[#1F2029] font-medium uppercase mt-0 mb-3">{section?.name}</h3>
                                {userData?.experiences.map((experience) => (
                                    <div key={experience.id} className="mb-7 break-inside-avoid">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="section-title text-white font-medium py-1.5 px-3 text-xs leading-6 m-0" style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', borderRadius: '0 100px 100px 0', color: applyTextColor(userData.templateColor ? userData.templateColor : '#FF7D24') }}>{experience?.jobTitle}</p>
                                            <div>
                                                <p className="text-[#576370] text-xs leading-6 m-0">{experience?.employer}, {experience.city}</p>
                                                <p className="text-[10px] text-[#83919E] text-end leading-6 m-0">{formatDate(experience?.startDate)} - {experience?.isCurrent === 1 ? "current" : formatDate(experience?.endDate)}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='text-[#576370] text-xs leading-6 m-0 quill-editor-content' dangerouslySetInnerHTML={{ __html: experience?.description }}></p>
                                        </div>
                                    </div>
                                ))
                                }
                            </section>
                        ))
                    }


                    {/* Education */}
                    {
                        userData?.sections.map((section) => (section.type == "education" && section.status == 1 &&
                            <section key={section.id} className='w-full owner-education mb-8 break-inside-avoid' style={{ order: section.order }}>
                                <h3 className="text-base text-[#1F2029] font-medium uppercase mt-0 mb-3">{section?.name}</h3>
                                {
                                    userData?.educations.map((education) => (
                                        <div key={education.id} className="mb-7 break-inside-avoid">
                                            <div className="section-inside flex items-center justify-between mb-4">
                                                <p className="section-title text-white font-medium py-1.5 px-3 text-xs leading-6 m-0" style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', color: applyTextColor(userData.templateColor ? userData.templateColor : '#FF7D24'), borderRadius: '0 100px 100px 0' }}>{education?.degree}</p>
                                                <div>
                                                    <p className="text-[#576370] text-xs leading-6 m-0">{education?.school}</p>
                                                    <p className="text-[10px] text-[#83919E] text-end leading-6 m-0"> {formatDate(education?.startDate)} - {education?.isCurrent === 1 ? "current" : formatDate(education?.endDate)}</p>

                                                </div>
                                            </div>

                                            <div>
                                                <p className='text-[#576370] text-xs leading-6 m-0 quill-editor-content' dangerouslySetInnerHTML={{ __html: education?.description }}></p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </section>
                        ))
                    }


                    {/* Internships */}
                    {
                        userData?.sections.map((section) => (section.type == "internship" && section.status == 1 &&
                            <section key={section.id} className='w-full owner-internship mb-8 break-inside-avoid' style={{ order: section.order }}>
                                <h3 className="text-base text-[#1F2029] font-medium uppercase mt-0 mb-3">{section?.name}</h3>
                                {
                                    userData?.internships.map((internship) => (
                                        <div key={internship.id} className="mb-7 break-inside-avoid">
                                            <div className="flex items-center justify-between mb-4">
                                                <p className="section-title text-white font-medium py-1.5 px-3 text-xs leading-6 m-0" style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', color: applyTextColor(userData.templateColor ? userData.templateColor : '#FF7D24'), borderRadius: '0 100px 100px 0' }}>{internship?.job_title}</p>
                                                <div>
                                                    <p className="text-[#576370] text-xs leading-6 m-0">{internship?.employer}, {internship.city}</p>
                                                    <p className="text-[10px] text-[#83919E] text-end leading-6 m-0">{formatDate(internship?.startDate)} - {internship?.isCurrent === true ? "current" : formatDate(internship?.endDate)}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className='text-[#576370] text-xs leading-6 m-0 quill-editor-content' dangerouslySetInnerHTML={{ __html: internship?.description }}></p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </section>
                        ))
                    }


                    {/* Courses */}
                    {
                        userData?.sections.map((section) => (section.type == "course" && section.status == 1 &&
                            <section key={section.id} className='w-full owner-courses mb-8 break-inside-avoid' style={{ order: section.order }}>
                                <h3 className="text-base text-[#1F2029] font-medium uppercase mt-0 mb-3">{section?.name}</h3>
                                {
                                    userData?.courses.map((course) => (
                                        <div key={course.id} className="mb-7 break-inside-avoid">
                                            <div className="flex items-center justify-between mb-4">
                                                <p className="section-title text-white font-medium py-1.5 px-3 text-xs leading-6 m-0" style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', color: applyTextColor(userData.templateColor ? userData.templateColor : '#FF7D24'), borderRadius: '0 100px 100px 0' }}>{course?.course}</p>

                                                <div>
                                                    <p className="text-[#576370] text-xs leading-6 m-0">{course?.institute}</p>
                                                    <p className="text-[10px] text-[#83919E] text-end leading-6 m-0">{formatDate(course?.startDate)} - {course?.isCurrent === true ? "current" : formatDate(course?.endDate)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </section>
                        ))
                    }


                    {/* Extra Activities */}
                    {
                        userData?.sections.map((section) => (section.type == "activity" && section.status == 1 &&
                            <section key={section.id} className='w-full owner-activities mb-8 break-inside-avoid' style={{ order: section.order }}>
                                <h3 className="text-base text-[#1F2029] font-medium uppercase mt-0 mb-3">{section?.name}</h3>
                                {
                                    userData?.activities.map((activity) => (
                                        <div key={activity.id} className="mb-7 break-inside-avoid">
                                            <div className="flex items-center justify-between mb-4">
                                                <p className="section-title text-white font-medium py-1.5 px-3 text-xs leading-6 m-0" style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', color: applyTextColor(userData.templateColor ? userData.templateColor : '#FF7D24'), borderRadius: '0 100px 100px 0' }}>{activity?.function_title}</p>
                                                <div>
                                                    <p className="text-[#576370] text-xs leading-6 m-0">{activity?.employer}, {activity.city}</p>
                                                    <p className="text-[10px] text-[#83919E] text-end leading-6 m-0">{formatDate(activity?.startDate)} - {activity?.isCurrent === true ? "current" : formatDate(activity?.endDate)}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className='text-[#576370] text-xs leading-6 m-0 quill-editor-content' dangerouslySetInnerHTML={{ __html: activity?.description }}></p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </section>
                        ))
                    }


                    {/* Custom Section */}
                    {
                        userData?.sections.map((section) => (section.type == 'custom' && section.status == 1 &&
                            <section key={section.id} className='w-full custom-section mb-8 break-inside-avoid' style={{ order: section.order }}>
                                <h3 className="text-base text-[#1F2029] font-medium uppercase mt-0 mb-3">{section?.name}</h3>
                                {
                                    section?.items.map((item) => (
                                        <div key={item.id} className="mb-7 break-inside-avoid">
                                            <div className="flex items-center justify-between mb-4">
                                                <p className="section-title text-white font-medium py-1.5 px-3 text-xs leading-6 m-0" style={{ backgroundColor: userData.templateColor ? userData.templateColor : '#FF7D24', color: applyTextColor(userData.templateColor ? userData.templateColor : '#FF7D24'), borderRadius: '0 100px 100px 0' }}>{item?.activity_title}</p>
                                                <div>
                                                    <p className="text-[#576370] text-xs leading-6 m-0">{item.city}</p>
                                                    <p className="text-[10px] text-[#83919E] text-end leading-6 m-0">{formatDate(item?.startDate)} - {item?.isCurrent == true ? "current" : formatDate(item?.endDate)}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className='text-[#576370] text-xs leading-6 m-0 quill-editor-content' dangerouslySetInnerHTML={{ __html: item?.description }}></p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </section>
                        ))
                    }
                </div>
            </div>


            {/* Right side overlay of the resume */}
            {/* <div className="absolute right-0 top-0 bottom-0">
                <img className="w-4/5" src={profilePhoto} onError={(e) => e.target.src = './images/Group 7.png'} />
            </div> */}
        </div>
    );
};

export default Resume2;