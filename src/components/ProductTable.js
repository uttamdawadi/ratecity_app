import "../App.css";
import {Button, List, Table} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {RightCircleOutlined} from '@ant-design/icons';

function ProductTable() {

    const [dataSource, setDataSource] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRecords(1);
    }, []);

    const columns = [
        {
            title: "", dataIndex: "companyLogo", key: "image",
            render: theImageURL => <img alt={theImageURL} src={theImageURL} width="80%"/>,
            width: '10%',
        },
        {
            title: "Name", dataIndex: "providerName", key: "name", width: "25%"
        },
        {
            title: "Advertise rate",
            dataIndex: "advertisedRate",
            key: "advertisedRate",
            render: text => <p>{text} %</p>,
            width: "10%"
        },
        {
            title: "Comparison rate",
            dataIndex: "comparisonRate",
            key: "comparisonRate",
            render: text => <p>{text} %</p>,
            width: "10%"
        },
        {
            title: "Pros", dataIndex: "pros", key: "pros", render: item => <List
                size="small"
                dataSource={item.slice(0,4)}
                renderItem={item => <List.Item>{item}</List.Item>}
            />, width: "30%"
        },
        {
            title: "", dataIndex: "gotoSiteUrl", key: "gotoSiteUrl",
            render: url =>  <a href= {url} target="_blank"> <Button type="primary" icon={<RightCircleOutlined/>} size="large">Go to Site </Button> </a>,
            width: "15%"
        },

    ];

    const fetchRecords = (page) => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: `https://api.ratecity.com.au/v2/home-loans?page=${page}`,
            headers: {'x-api-key': 'MaDX2Oo31g3FLAHesYHtGa3rHe40uqkJ8TmbPJn9'}
        };
        axios
            .request(options)
            .then((res) => {
                setDataSource(res.data.hits);
                setTotalPages(res.data.meta.totalCount);
                setLoading(false);
            });
    };

    return (
        <div className="site-card-wrapper"
             style={{
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
             }}>

            <Table
                className={"divTable"}
                loading={loading}
                columns={columns}
                size="middle"
                dataSource={dataSource}
                width ="100%"
                pagination={{
                    position: ["bottom", "topRight", "bottomRight"],
                    total: totalPages,
                    onChange: page => {
                        fetchRecords(page);
                    },
                    pageSize: 15,

                }}>
            </Table>
        </div>
    );
}

export default ProductTable;