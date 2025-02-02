import Image from "next/image";
import styles from "./page.module.css";
import Articles from "@/components/Articles";
import Footer from "@/components/footer";


export default function Home() {
  return (
    <div>
       <Footer/>
    
       <Articles />
    </div>
   
  );
}
