import { get, put, post, del } from '@/request';

export interface InterfacePage {
  page?: number
  size?: number
};

export interface InterfaceDocument {
  method: number
  title: string
  url: string
  requestList: InterfaceRequestList[]
  tag: string
  responseSuccess?: string
  responseError?: string
  _id?: string,
};

export interface InterfaceRequestList {
  title: string
  type: string
  require: boolean
  defaultValue?: string
  content?: string
};

export interface InterfaceTag {
  name: string
  _id: string
};

export interface InterfaceDocumentList extends InterfacePage{
  _id: string
}

export async function getDocument(id: string) {
  return get(`/api/document/${id}`);
};

export async function getDocumentList(params?:InterfaceDocumentList) {
  return get('/api/document', params);
};

export async function putDocument(params:InterfaceDocument) {
  return put('/api/document', params);
};

export async function postDocument({ _id, ...params }:InterfaceDocument) {
  return post(`/api/document/${_id}`, params);
};

export async function deleteDocument(id:string) {
  return del(`/api/document/${id}`);
};

export async function getTagList(params?:InterfacePage) {
  return get('/api/tag', params);
};

export async function putTag(params:InterfaceTag) {
  return put('/api/tag', params);
};

export async function postTag({ _id, ...params }:InterfaceTag) {
  return post(`/api/tag/${_id}`, params);
};

export async function deleteTag(id:string) {
  return del(`/api/tag/${id}`);
};
