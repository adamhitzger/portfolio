"use client"

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { content } from "@/lib/content";
import { Projects, Reviews, ActionResponse, Form, Project, Review } from "@/types";
import 'react-social-icons/linkedin'
import 'react-social-icons/github'
import { SocialIcon } from 'react-social-icons/component'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useActionState, useState, useEffect, useRef, Suspense } from "react";
import sendData from "@/lib/action";
import toast from "react-hot-toast";
import { Loader, X } from "lucide-react";
import { 
    Carousel,
    CarouselContent,
  CarouselItem,
  type CarouselApi,
 } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { PortableText } from "next-sanity";
import { AnimatePresence, motion } from "motion/react";

const actionState: ActionResponse<Form> = {
    success: false,
    message: "",
    submitted: false
}

function UX({projects, hobby, reviews}: {projects: Projects, hobby:Projects, reviews: Reviews}){
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang') || "cs"
    const obsah = content[lang as keyof typeof content] || content.cs
    
    const [state, action, isPending] = useActionState(sendData, actionState)
    const [api, setApi] = useState<CarouselApi>()
    const [step, setStep] = useState<number>(1)
    const [current, setCurrent] = useState<number>(0)
    const [count// eslint-disable-line @typescript-eslint/no-unused-vars
     , setCount] = useState<number>(0)
    const [id, setId] = useState<string>("")
    const [project, setProject] = useState<boolean>(false)
    const [review, setReview] = useState<string>("")
    const [hobbys, setHobby] = useState<boolean>(false)
    const projectRef = useRef<HTMLDivElement>(null);
    const hobbyRef = useRef<HTMLDivElement>(null);
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
      )

      useEffect(() => {
        function handleMouseOutside(e: MouseEvent | TouchEvent){
            if(
                projectRef.current &&
                !projectRef.current.contains(e.target as Node)
            ){
                setProject(false)
            }

            if(
                hobbyRef.current &&
                !hobbyRef.current.contains(e.target as Node)
            ){
                setHobby(false)
            }
        }

        document.addEventListener("mousedown", handleMouseOutside);
        document.addEventListener("touchstart", handleMouseOutside);
        
        return () => {
            document.addEventListener("mousedown", handleMouseOutside);
            document.addEventListener("touchstart", handleMouseOutside);   
        }
    })
  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
    }, [api])

    useEffect(() =>{
        if(state.submitted && !state.success){
            toast.error(state.message)
        }
        if(state.submitted && state.success){
          toast.success(state.message)
      }
      }, [state.submitted, state.success, state.message])
      console.log(projects, hobby, reviews)
      return(
        <main className="flex flex-col min-h-screen max-w-4xl items-center p-4 space-y-5">
        <nav className="w-full gap-5 sm:space-x-10 flex-wrap flex flex-row justify-between items-center">
     <p>
       <span className="text-secondary text-5xl sm:text-7xl">🧑🏻‍💻.</span>
        <Link href={"mailto:adam.hitzger@icloud.com"} className="text-text font-medium underline text-lg">adam.hitzger@icloud.com</Link>
       </p>
        <Link href={lang === "cs" ? "/?lang=en" : "/?lang=cs"} className="rounded-full bg-white h-fit px-2 py-1 text-2xl ">
            {lang === "cs" ? "🇬🇧" : "🇨🇿"}
        </Link>
    </nav>
    <header className="flex flex-wrap flex-row items-center gap-3">
        <span className="font-semibold text-4xl sm:text-5xl">{obsah.header.text}</span>
        <div className="p-1 bg-white rounded-xl">
            <Image src={"/me.jpeg"} alt="Adam Hitzger" width={100} height={100} className="rounded-xl"/>
        </div>
        <span className="font-semibold text-4xl sm:text-5xl">{obsah.header.text2}</span>
        <br />
        <span className="font-semibold text-4xl sm:text-5xl text-foreground">{obsah.header.text3}</span>
        <span className="font-semibold text-4xl sm:text-5xl">{obsah.header.text4}</span>
        <span className="font-semibold text-4xl sm:text-5xl text-foreground">{obsah.header.text5}</span>
        <span className="font-semibold text-4xl sm:text-5xl text-secondary">{obsah.header.text6}</span>
        <div className="border gap-4 rounded-full p-2.5 flex flex-row flex-nowrap items-center">
            <div className="w-7 h-7 p-1.5 rounded-full transform transition-transform duration-600 hover:scale-140 hover:duration-120" style={{background: "#C3F9E0"}}>
            
            <div className="w-4 h-4 p-1 rounded-full transform transition-transform duration-450 hover:scale-120 hover:duration-150" style={{background: "#79c2a0"}}>
            <div className="w-2 h-2 rounded-full transform transition-transform duration-300 hover:scale-120 hover:duration-200" style={{background: "#0EFF80"}}>
                </div>
                </div>
            </div>
            <span className="text-lg">{obsah.header.openToWork}</span>
        </div>
        <div className="w-full">
            <Dialog>
                <DialogTrigger asChild>
        <button className="border gap-4 rounded-full w-fit p-2.5 flex flex-row flex-nowrap items-center bg-text text-white justify-center font-semibold text-lg">
        {obsah.header.btnText}
        </button>
        </DialogTrigger>
        <DialogContent >
            <DialogHeader className="text-left">
                <DialogTitle>
                    <Link href="tel:+420605859361">{obsah.form.tel}</Link></DialogTitle>
                <DialogTitle>
                {obsah.form.contact}
                </DialogTitle>
            </DialogHeader>
            <form action={action} className="grid grid-cols-1 sm:grid-cols-2  w-full gap-3 ">
                    <input name="fullname" type="text" defaultValue={state.inputs?.fullname} className="border-white border rounded-full p-3" placeholder={obsah.form.nameHolder} required disabled={isPending} />
                    {state?.errors?.fullname && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.fullname}
                               </p>
                            )}
                    <input name="email" defaultValue={state.inputs?.email} type="email" className="border-white border rounded-full p-3" placeholder={obsah.form.emailHolder} required disabled={isPending} />
                    {state?.errors?.email && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.email}
                               </p>
                            )}
                    <input name="tel" defaultValue={state.inputs?.tel} type="text" className="border-white border rounded-full p-3" placeholder={obsah.form.telHolder} required disabled={isPending} />
                    {state?.errors?.tel && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.tel}
                               </p>
                            )}     
                             <input name="company" defaultValue={state.inputs?.company} type="text" className="border-white border rounded-full p-3" placeholder={obsah.form.companyHolder} required disabled={isPending} />
                    {state?.errors?.company && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.company}
                               </p>
                            )}  
                             <textarea name="message" defaultValue={state.inputs?.message} className="border-white border rounded-xl p-3" placeholder={obsah.form.messageHolder} required disabled={isPending} />
                    {state?.errors?.message && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.message}
                               </p>
                            )}      
                           
                            <button className="h-fit p-2 border justify-self-end rounded-full w-fit flex flex-row flex-nowrap items-center bg-white text-text justify-center font-semibold text-lg"
                            type="submit">
        {isPending ? <Loader className="animate-spin"/> :obsah.form.send}
        </button>   
            </form>
        </DialogContent>
        </Dialog>
        </div>
    </header>
    <div className="w-full gap-2 grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-2">
        
        <div  className="w-full h-auto p-2 bg-white rounded-lg relatve">
        
            <div  className="w-full h-full p-2 bg-card roundd-lg relative">
            <button className="absolute p-1 z-50 top-1 left-1 bg-white rounded-md w-fit flex flex-nowrap text-xs flex-row">
                {obsah.main.myWork}
            </button>
            <div className="pt-6">
                {projects && projects.map((p:Project, i:number) => (
                    i > projects.length-5 ? (
                        <div key={i} 
                        onClick={() => {
            setProject(true)
            setId(p._id)
            }}
                        className="flex w-full gap-x-3 relative group rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
                        
                        <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-text dark:after:bg-neutral-700 dark:group-hover:after:bg-neutral-600">
                          <div className="relative z-10 size-7 flex justify-center items-center">
                            <div className="size-2 rounded-full bg-text border-2 border-text group-hover:border-gray-600 dark:bg-neutral-800 dark:border-neutral-600 dark:group-hover:border-neutral-600"></div>
                          </div>
                        </div>
                        <div className="flex flex-col ">
                          <h3 className="flex font-semibold text-gray-800 dark:text-white">
                            {lang === "en" ? p.title_en: p.title_cz}
                          </h3>
                          <p className=" relative z-10 inline-flex items-center text-xs rounded-lg border border-transparent text-gray-500 hover:bg-white hover:shadow-2xs disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800">
                            {p.year}
                          </p>
                        </div>
                      </div>
                    ) : null
                ))}
                </div>

           
        </div>
        </div>

        <div className="w-full h-auto p-2 bg-white rounded-lg sm:col-span-2">
        <div className="w-full h-full p-2 bg-card  rounded-lg relative">
        <button className="absolute p-1 z-50 top-1 left-1 bg-white rounded-md w-fit flex flex-nowrap text-xs flex-row">
                {obsah.main.reviews}
            </button>
            <div className="pt-6 flex flex-col justify-between h-full">
                <Carousel 
                    setApi={setApi}
                    plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
                    >
                    <CarouselContent>
                        {reviews.map((r: Review, i: number) => (
                            <CarouselItem key={i} className="flex flex-col space-y-4">
                                <span className="text-center italic text-base">{lang === "en" ? r.review_en : r.review_cz}</span>
                                <div className="flex flex-col w-full">
                                <span className="text-right font-semibold">{r.client},</span>
                                <span className="text-right font-semibold">{r.company}</span>
                                <span className="text-right text-xs text-foreground">{r.year}</span>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="flex rounded-full flex-row p-1.5 w-fit h-fit bg-white mx-auto">
                        {reviews.map((_, i:number) => (
                            <div key={i} className={`w-4 h-4 rounded-full ${current-1 === i ? "bg-secondary" : "bg-foreground"}`}
                            onClick={() => setCurrent(i-1)}
                            >
                            </div>
                        ))}
                </div>
            </div>
        </div>
        </div>

        <div className="w-full h-auto p-2 bg-white rounded-lg sm:col-span-2">
        <div className="w-full h-full flex flex-col justify-between p-2 bg-card  rounded-lg relative">
            <button className="absolute p-1 z-50 top-1 left-1 bg-white rounded-md w-fit flex flex-nowrap text-xs flex-row">
                {obsah.main.work}
            </button>
            <div className="pt-8 flex flex-col space-y-4">
            {step === 1 ?
                <div className="flex flex-col space-y-2">
                    <h2 className="font-bold text-base">{("0"+step)+" "+obsah.main.krok1}</h2>
                    <p className="text-xs text-foreground">{obsah.main.text1}</p>
                    </div>
                : null}
               {step === 2 ?
                <div className="flex flex-col space-y-2">
                    <h2 className="font-bold text-base">{("0"+step)+" "+obsah.main.krok2}</h2>
                    <p className="text-xs text-foreground">{obsah.main.text2}</p>
                    </div>
                : null} 
                {step === 3 ?
                <div className="flex flex-col space-y-2">
                    <h2 className="font-bold text-base">{("0"+step)+" "+obsah.main.krok3}</h2>
                    <p className="text-xs text-foreground">{obsah.main.text3}</p>
                    </div>
                : null}
                {step === 4 ?
                <div className="flex flex-col space-y-2">
                    <h2 className="font-bold text-base">{("0"+step)+" "+obsah.main.krok4}</h2>
                    <p className="text-xs text-foreground">{obsah.main.text4}</p>
                    </div>
                : null}
                {step === 5 ?
                <div className="flex flex-col space-y-2">
                    <h2 className="font-bold text-base">{("0"+step)+" "+obsah.main.krok5}</h2>
                    <p className="text-xs text-foreground">{obsah.main.text5}</p>
                    </div>
                : null}
            
            </div>
            <div className="flex rounded-full space-x-3 flex-row p-1.5 w-fit h-fit bg-white mx-auto">
                
                
                {Array.from({length: 5}).map((_, i:number) => (
                    <button key={i} onClick={() => setStep(i+1)} className="hover:transition hover:duration-350 hover:scale-110 border gap-4 rounded-full p-1 w-fit h-fit flex flex-row items-center bg-text text-white justify-center sm:font-semibold text-xs">
                    {obsah.main.krok+(i+1)}
                    </button>
                ))}
            </div>
        </div>
        </div>

        <div   className="w-full h-auto p-2 bg-white rounded-lg">
            <div className="w-full h-full p-2 bg-card  rounded-lg relative">
            <button className="absolute p-1 z-50 top-1 left-1 bg-white rounded-md w-fit flex flex-nowrap text-xs flex-row">
                {obsah.main.myHobby}
            </button>
            <div className="pt-6">
                {hobby && hobby.map((p:Project, i:number) => (
                    i > hobby.length-4 ? (
                        <div onClick={() => {
            setHobby(true)
            setId(p._id)
            }} key={i} className="flex gap-x-3 relative group rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
                        <a className="z-1 absolute inset-0" href="#"></a>
                        <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-text dark:after:bg-neutral-700 dark:group-hover:after:bg-neutral-600">
                          <div className="relative z-10 size-7 flex justify-center items-center">
                            <div className="size-2 rounded-full bg-text border-2 border-text group-hover:border-gray-600 dark:bg-neutral-800 dark:border-neutral-600 dark:group-hover:border-neutral-600"></div>
                          </div>
                        </div>
                        <div className="grow ">
                          <h3 className="flex font-semibold text-gray-800 dark:text-white">
                            {lang === "en" ? p.title_en: p.title_cz}
                          </h3>
                          <p className=" relative z-10 inline-flex items-center text-xs rounded-lg border border-transparent text-gray-500 hover:bg-white hover:shadow-2xs disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800">
                            {p.year}
                          </p>
                        </div>
                      </div>
                    ) : null
                ))}
                </div>
            </div>
        </div>
    </div>
    <footer className="w-fit flex flex-row items-center space-x-7 text-xl font-semibold">
        <SocialIcon url="https://www.linkedin.com/in/adam-hitzger-aa518622b/" target='_blank' network="linkedin" bgColor="black"/>
        <a href="https://blog.adamhitzger.com">Blog</a>
        <SocialIcon url="https://github.com/adamhitzger" target='_blank' network="github" bgColor="black"/>
    </footer>
<AnimatePresence>
    {project && 
        <motion.div 
        className="w-full h-full absolute p-5" 
        ref={projectRef}
        initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
        >
        <div className=" w-full z-51 h-full gap-2 p-2 bg-card flex flex-col sm:flex-row  rounded-lg relative">
        <button className="absolute p-1  z-52 top-1 text-text left-2 bg-white rounded-md w-fit flex flex-nowrap items-center flex-row">
                <span>{obsah.main.myWork}</span> <X onClick={() => setProject(false)} className="w-6 h-6 pl-2"/>
            </button>
            <div className="pt-6 h-full w-full sm:w-1/2 ">
                <div className="w-full">
                {projects && projects.map((p:Project, i:number) => (
                    
                        <div key={i} onClick={() => {
                            setId(p._id)
                            if(p.review?._ref) setReview(p.review._ref);
                            }} className="flex gap-x-3 relative group rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
                        <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-text dark:after:bg-neutral-700 dark:group-hover:after:bg-neutral-600">
                          <div className="relative z-10 size-7 flex justify-center items-center">
                            <div className="size-2 rounded-full bg-text border-2 border-text group-hover:border-gray-600 dark:bg-neutral-800 dark:border-neutral-600 dark:group-hover:border-neutral-600"></div>
                          </div>
                        </div>
                        <div className="grow ">
                          <h3 className="flex text-lg font-semibold text-gray-800 dark:text-white">
                            {lang === "en" ? p.title_en: p.title_cz}
                          </h3>
                          <p className=" relative z-10 inline-flex items-center text-sm rounded-lg border border-transparent text-gray-500 hover:bg-white hover:shadow-2xs disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800">
                            {p.year}
                          </p>
                        </div>
                      </div>
                ))}
                </div>

                
                </div>
                <div className="min-w-1/2 overflow-y-scroll h-full sm:w-1/2 text-black bg-white rounded-xl p-1.5">
                {projects.filter((p) => p._id === id)
                .map((project) => (
                <div key={project._id} className="w-full h-full space-y-3 flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                    <Link href={project.www} target="_blank">
                    <h2 className="text-xl underline underline-offset-2 font-semibold">{lang === "en" ? project.title_en: project.title_cz}</h2>
                    </Link>
                    <X className=" h-5 w-5" onClick={()=>setId("")}/>
                    </div>
                    <Link href={project.www} target="_blank" className="w-full h-full hidden md:flex">
                    <iframe src={project.www} className="h-full w-full "></iframe>
                    </Link>
                    <PortableText value={lang ==="en"? project.description_en: project.description_cz}/>
                    {reviews.filter((rew) => rew._id === review)
                    .map((r) => (
                        <div key={r._id} className="ěflex flex-col space-y-4">
                                <span className="text-center italic text-base">{lang === "en" ? r.review_en : r.review_cz}</span>
                                <div className="flex flex-col w-full">
                                <span className="text-right font-semibold">{r.client},</span>
                                <span className="text-right font-semibold">{r.company}</span>
                                <span className="text-right text-xs text-foreground">{r.year}</span>
                                </div>
                            </div>
                    ))}
                
                    </div>
                ))}
                </div>
        </div>
        </motion.div>
        }
        </AnimatePresence>
        <AnimatePresence>
        {hobbys && 
        <motion.div
         className="z-51 w-full h-full absolute p-5" 
         ref={hobbyRef}
         initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
         >
        <div className=" w-full h-full gap-2 p-2 bg-card flex flex-col sm:flex-row  rounded-lg relative">
        <button className="absolute p-1  z-52 top-1 text-text left-2 bg-white rounded-md w-fit flex flex-nowrap items-center flex-row">
                <span>{obsah.main.myWork}</span> <X onClick={() => setHobby(false)} className="w-6 h-6 pl-2"/>
            </button>
            <div className="pt-6 h-full w-full sm:w-1/2 ">
                <div className="w-full">
                {hobby && hobby.map((p:Project, i:number) => (
                    
                        <div key={i} onClick={() => {
                            setId(p._id)
                            }} className="flex gap-x-3 relative group rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
                        <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-text dark:after:bg-neutral-700 dark:group-hover:after:bg-neutral-600">
                          <div className="relative z-10 size-7 flex justify-center items-center">
                            <div className="size-2 rounded-full bg-text border-2 border-text group-hover:border-gray-600 dark:bg-neutral-800 dark:border-neutral-600 dark:group-hover:border-neutral-600"></div>
                          </div>
                        </div>
                        <div className="grow ">
                          <h3 className="flex text-lg font-semibold text-gray-800 dark:text-white">
                            {lang === "en" ? p.title_en: p.title_cz}
                          </h3>
                          <p className=" relative z-10 inline-flex items-center text-sm rounded-lg border border-transparent text-gray-500 hover:bg-white hover:shadow-2xs disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800">
                            {p.year}
                          </p>
                        </div>
                      </div>
                ))}
                </div>

                
                </div>
                <div className="min-w-1/2 overflow-y-scroll h-full sm:w-1/2 text-black bg-white rounded-xl p-1.5">
                {hobby.filter((p) => p._id === id)
                .map((project) => (
                <div key={project._id} className="w-full h-full space-y-3 flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                    <Link href={project.www} target="_blank">
                    <h2 className="text-xl underline underline-offset-2 font-semibold">{lang === "en" ? project.title_en: project.title_cz}</h2>
                    </Link>
                    <X className=" h-5 w-5" onClick={()=>setId("")}/>
                    </div>
                    <Link href={project.www} target="_blank" className="w-fit h-wit self-center">
                    {project.pictures && <Image alt={project.title_cz} src={project.pictures} width={250} height={250} />}
                    
                    </Link>
                    <PortableText value={lang ==="en"? project.description_en: project.description_cz}/>
                
                    </div>
                ))}
                </div>
        </div>
        </motion.div>
        }
        </AnimatePresence>
    </main>
   
    )
}
export default function UI({projects, hobby, reviews}: {projects: Projects, hobby:Projects, reviews: Reviews}){
    return(
        <Suspense>
             <UX projects={projects} hobby={hobby} reviews={reviews}/>
        </Suspense>
    )
}