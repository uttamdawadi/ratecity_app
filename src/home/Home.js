import React from "react";
import ProductCards from "../components/ProductCards";
import ProductTable from "../components/ProductTable";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Button} from "antd";
import ProductCompare from "../components/ProductCompare";

const Home = () => {
    return (
        <Router>
            <div>
                <Button> <Link to="/card"> Task 1: Card </Link> </Button>
                <Button> <Link to="/table"> Task 2: Table </Link> </Button>
                <Button> <Link to="/compare"> Task 3: Compare </Link> </Button>
                <Switch>
                    <Route exact path="/card"> <ProductCards/>
                    </Route>

                    <Route path="/table">
                       <ProductTable/>
                    </Route>

                    <Route path="/compare">
                        <ProductCompare/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Home;
