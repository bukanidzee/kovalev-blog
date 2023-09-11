import { IFetchSuccess } from './../types/fetchtypes'
import axios, { AxiosResponse } from 'axios'

export interface IArticleData {
  _id: string
  title: string
  content: string
  shortDescription: string
  picture: string
  lastUpdated: Date
}

type TArticleCreate = (
  data: FormData
) => Promise<AxiosResponse<IArticleData, any>>

export type TGetAllArticlesResponse = IArticleData[]

type TGetAllArticles = () => Promise<
  AxiosResponse<TGetAllArticlesResponse, any>
>

type TGetArticle = (id: string) => Promise<AxiosResponse<IArticleData, any>>

type TPutArticle = (
  id: string,
  data: FormData
) => Promise<AxiosResponse<IArticleData, any>>

type TDeleteArticle = (id: string) => Promise<AxiosResponse<IFetchSuccess, any>>

export const postArticle: TArticleCreate = async data =>
  await axios.post<IArticleData>('/api/articles', data)

export const getAllArticles: TGetAllArticles = async () =>
  await axios.get<TGetAllArticlesResponse>('/api/articles')

export const getArticle: TGetArticle = async id =>
  await axios.get<IArticleData>(`/api/articles/${id}`)

export const putArticle: TPutArticle = async (id, data) =>
  await axios.put<IArticleData>(`/api/articles/${id}`, data)

export const deleteArticle: TDeleteArticle = async id =>
  await axios.delete<IFetchSuccess>(`/api/articles/${id}`)
