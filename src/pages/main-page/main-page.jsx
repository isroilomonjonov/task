import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import http from "../../utils/axios-instance";
import { toast } from 'react-toastify';
import { Table } from 'antd';
import { Input } from 'antd';

const MainPage = () => {
  const [products,setProducts]=useState([])
  const [total,setTotal]=useState(0)
  const [page,setPage]=useState(1)
  useEffect(()=>{
   getAllVariations()
  },[page])
  const getAllVariations=async()=>{
    try {
			const res = await http({
				url: `/variations?size=10&page=${page}`,
			});
			console.log(res);
      setProducts(res.data.items)
      setTotal(Math.ceil(res.data.total_count/res.data.items.length))
		} catch (error) {
			toast.error(error.response.data.message);
		}
  }
  
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  
  ];
  const onChangePagination=(data)=>{
    setPage(data)
  }

  return (
    <Layout>
      <h2>Main Page</h2>
      <hr />
  {products.length>=1&&<Table dataSource={products} columns={columns} pagination={{defaultCurrent:1 ,total:total,onChange:onChangePagination,pageSizeOptions:[10] }}/>}
    </Layout>
  )
}

export default MainPage