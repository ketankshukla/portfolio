"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {motion} from "framer-motion";
import {useSectionInView} from "@/lib/hooks";

export default function About() {
    const {ref} = useSectionInView("About");

    return (
        <motion.section
            ref={ref}
            className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
            initial={{opacity: 0, y: 100}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.175}}
            id="about"
        >
            <SectionHeading>About me</SectionHeading>
            <p className="mb-3">
                <span>
                  I am a passionate and experienced software developer with a strong background in mid to large-scale projects. My technical proficiency spans a wide range of technologies including HTML, CSS, JavaScript, React JS, Angular JS, Node.js, and various database systems like MongoDB, PostgreSQL, and SQL Server. Over the years, I have developed a deep understanding of both front-end and back-end development, enabling me to deliver comprehensive solutions from conception to deployment.
                </span>
                <span>
                    <p>
                        In my current role as a React JS Developer at Next Wave Consulting, I have honed my skills in developing user interfaces and single-page applications using modern frameworks. My experience includes working extensively with the MERN stack, implementing responsive designs with CSS frameworks like Bootstrap, and ensuring cross-browser compatibility. I am proficient in using development tools such as Visual Studio Code and Postman, and debugging tools like Chrome Developer Tools.
                    </p>
                </span>
                <span>
                    <p>
                        My professional journey has also included roles as an independent business owner and consultant, where I leveraged my technical and interpersonal skills to drive business growth and deliver customized solutions to clients. This diverse experience has equipped me with the ability to communicate complex technical concepts to non-technical stakeholders and mentor teams to adopt best practices in software development.
                    </p>
                </span>
                <span>
                    I thrive in agile environments and am committed to delivering value to customers through innovative
                    solutions that meet their needs. My goal is to continue growing as a developer, staying abreast of the
                    latest industry trends, and contributing to impactful projects that make a difference.
                </span>
            </p>
        </motion.section>
    );
}
