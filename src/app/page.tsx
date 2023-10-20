'use client'
import Link from 'next/link'
import axios from "axios"
import { CasesContext } from '../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext'
import { AxiosResponse } from 'axios'
export default function Home() {
  



  return (
    <div>
      <div className='flex flex-col items-center justify-center'>
        <a> Bonjour!</a>
        <a> Je suis monsieur</a>
        <a> Je suis madame</a>

        <Link href="/avocat">
          <button>lien avocat</button>
        </Link>
      </div>
    </div>
  )
}
