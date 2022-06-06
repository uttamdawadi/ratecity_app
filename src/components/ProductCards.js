import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Card, Checkbox, Col, Divider, List, Row} from 'antd';
import axios from "axios";
import {CheckOutlined, RightCircleOutlined} from '@ant-design/icons';

function ProductCards() {
    const [dataSource, setDataSource] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRecords(1);

    }, []);


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
        <div className="site-card-wrapper">
        <List
            grid={{ gutter: 16,xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
                xxl: 4 }}
            size="large"
            pagination={{
                defaultCurrent :1,
                total: totalPages,
                onChange: page => {
                    fetchRecords(page);
                },
                pageSize: 15,
            }}
            dataSource={dataSource}



            renderItem={dataSource => (
                <List.Item>
                    <Card className="custom-card"
                          title={<span style={{
                              minHeight: "94px",
                              whiteSpace: "pre-line"
                          }}>
                                {dataSource.name}</span>}
                          bordered={true}>

                        <Row>
                            <Col span={12}>
                                    <span style={{
                                        fontSize: "12px",
                                        color: "#757575"
                                    }}>Advertised Rate</span> <br/>
                                <span style={{
                                    fontSize: "20px",
                                    fontWeight: "bold"
                                }}> {dataSource.advertisedRate} %</span>
                            </Col>
                            <Col span={12}>
                                    <span style={{
                                        fontSize: "12px",
                                        color: "#757575"
                                    }}>Comparison Rate</span> <br/>
                                <span style={{
                                    fontSize: "20px",
                                    fontWeight: "bold"
                                }}> {dataSource.comparisonRate} %</span>
                            </Col>
                        </Row>
                        <Divider />
                        <List
                            className="custom-list"
                            size="small"
                            dataSource={dataSource.pros.slice(0,4)}

                            renderItem={ item =>
                                <List.Item > <span style={{textAlign:"initial"}}><CheckOutlined />{item} </span>
                                </List.Item>
                            }></List>

                        <Row className={"compareDiv"}>
                            <Col span={12}>
                                <Checkbox>Compare</Checkbox>
                            </Col>
                            <Col span={12}>
                                <a href={dataSource.gotoSiteUrl}>More Information</a>
                            </Col>
                        </Row>
                        <Divider />
                        <Row >
                            <Col span={12}>
                                <img alt={dataSource.companyLogo} src={dataSource.companyLogo} width="50%"/>
                            </Col>
                            <Col span={12}>
                                <a href= {dataSource.gotoSiteUrl} target="_blank"> <Button
                                    style={{
                                        background:"#2e7d32",
                                        color:"white"
                                    }}
                                    icon={<RightCircleOutlined/>} size="large">Go to Site </Button> </a>
                            </Col>
                        </Row>
                    </Card>
                </List.Item>

            )}
        />
        </div>
    )

}

export default ProductCards;