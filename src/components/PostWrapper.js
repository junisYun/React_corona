import './PostWrapper.css'
import { Nav } from 'react-bootstrap'
import { Link, Route } from 'react-router-dom'
import Home from './Home'
import BarChart from './BarChart'
import LineChart from './LineChart'
import CircleChart from './CircleChart'

function PostWrapper() {
    return (
        <div className="PostWrapper mt-3">
            <Nav variant="pills">
                <Nav.Item>
                    <Nav.Link as={Link} Link to="/" eventKey="link-1">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} Link to="/corona_bar" eventKey="link-2">누적 확진자 현황</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} Link to="/corona_line" eventKey="link-3">월별 격리자 현황</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} Link to="/corona_circle" eventKey="link-4">종합 차트</Nav.Link>
                </Nav.Item>
            </Nav>


            {/* 메인화면 */}
            <Route exact path="/">
                <div>
                    <Home></Home>
                </div>
            </Route>

            {/* 바 차트 */}
            <Route exact path="/corona_bar">
                <BarChart />
            </Route>


            {/* 라인 차트 */}
            <Route exact path="/corona_line">
                <div>
                    <LineChart />
                </div>
            </Route>

            {/* 원 차트 */}
            <Route exact path="/corona_circle">
                <div>
                    <CircleChart />
                </div>
            </Route>
        </div>
    );
}

export default PostWrapper;