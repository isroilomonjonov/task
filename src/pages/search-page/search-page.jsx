import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import http from "../../utils/axios-instance";
import { toast } from "react-toastify";
import { Input, Table } from "antd";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);

  useEffect(() => {
    getAllVariations();
  }, []);
  useEffect(() => {
    console.log('sasas');
    const regex = new RegExp(searchVal, "i");
    const timer = setTimeout(() => {
      setSearchProduct(products.filter((product) => regex.test(product.name)));
    }, 0.5);
    setTotal(Math.ceil(searchProduct / 10));
    return () => {
      clearTimeout(timer);
    };
  }, [searchVal, page,products]);
  const changeHandler = (e) => {
    setSearchVal(e.target.value);
  };
  const getAllVariations = async () => {
    try {
      const res = await http({
        url: `/variations`,
      });
      setProducts(res.data.items);
      setTotal(Math.ceil(res.data.total_count / res.data.items.length));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];
  const onChangePagination = (data) => {
    setPage(data);
  };

  return (
    <Layout>
      <h2>Search Page</h2>
      <hr />
      <Input placeholder="Search by name...." onChange={changeHandler} />

      {searchProduct.length >= 1 && (
        <Table
          dataSource={searchProduct}
          columns={columns}
          pagination={{
            defaultCurrent: 1,
            total: total,
            onChange: onChangePagination,
            pageSizeOptions: [10],
          }}
        />
      )}
    </Layout>
  );
};

export default SearchPage;
