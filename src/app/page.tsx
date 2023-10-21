'use client'
import Link from 'next/link'
import axios from "axios"
import { CasesContext } from '../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext'
import { AxiosResponse } from 'axios'
import { GetSetLocalValue, StorageTypes, useLocalStorage } from './Hooks/LocalStorage';
import { useEffect, useState } from 'react'
import { AxiosActionData, AxiosActionTypes, useAxiosContext, useAxiosDispatch } from './Contexts/AxiosContext';
import ProvidersContainer from './Components/ProvidersContainer'


export default function Home() {
  const axios = useAxiosContext();
  const axiosDispatch = useAxiosDispatch();

  console.log(` axios =${axios == null}`)
  console.log(` adispatch = ${axiosDispatch == null}`)

  const newConfig = {
    ...axios.defaults,
    baseURL: "test"
  }
  const ationData: AxiosActionData = {
    actionType: AxiosActionTypes.swapAxiosDefaults,
    info: newConfig
  }

  useEffect(() => {
    axiosDispatch?.(ationData)

  }, [])

  console.log()


  return (
    <div>
      <a> home ?</a>
    </div>
  )
}