//the blue background box with Main title and subtitle
var MainTitle = React.createClass({
    render: function() {
        return (
            <div className="titleBox">
                <h1 id="title">TODAY IN AMERICA</h1>
                <h3 id="subtitle">COLLECTING THE BIGGEST ISSUES WE FACE TODAY</h3>
            </div>
        )
    }
});
//Social &links component for white background cards
var Social = React.createClass({
    render: function() {
        return (
            <div className="social">
                <p className="source">LEARN MORE:</p>
                <a className="sourceLink" href="#">WHO, GUARDIAN</a>
                <img className="socialBtn" src="./grey_share_icon.png"/>
                <p className="category">#HealthCare</p>
            </div>
        )
    }
});
//Social &links component for red background cards
var SocialRed = React.createClass({
    render: function() {
        return (
            <div className="social socialRed">
                <div>
                    <p className="source sourceRed">SOURCE:</p>
                    <a className="sourceLink sourceLinkRed" href="#">UNKNOWN</a>
                    <img className="socialBtn" src="./white_share_icon.png"/>
                    <p className="category categoryRed">#Shootings</p>
                </div>
            </div>
        )
    }
});
//Red card component
var RedCard = React.createClass({
    render: function() {
        return (
            <div className="graphRed">
                <p className="big">{this.props.text}</p>
                <p className="small">{this.props.subtitle}</p>
                <SocialRed/>
            </div>
        )
    }
});
//Text-only component
var TextCard = React.createClass({
    render: function() {
        return (
            <div className="graphText">
                <p className='big'>{this.props.text}</p>
                <Social/>
            </div>
        )
    }
});
//BarGraph component
var BarGraphCard = React.createClass({
    render: function() {
        var bars = [];
        bars = this.props.data.bars.map(function(bar, index) {
            return (
                <div>
                    <p className="barTitle">{bar.title}
                        <div className="barDetail">{bar.detail}</div>
                    </p>
                    <div className="bar"></div>
                </div>
            )
        });
        return (
            <div className="graph">
                <p className='graphTitle'>
                    {this.props.data.title}
                    <div className='graphSubtitle'>{this.props.data.subtitle}</div>
                </p>
                {bars}
                <Social/>
            </div>
        )
    }
});
//PieGraph component
var PieGraphCard = React.createClass({
    render: function() {
        return (
            <div className="graph">
                <p className="graphTitle">
                    {this.props.title}
                    <div className='graphSubtitle'>{this.props.subtitle}</div>
                </p>
                <Social/>
            </div>
        )
    }
});
//LineGraph Component
var LineGraphCard = React.createClass({
    render: function() {
        return (
            <div className="graph">
                {/*<p className="graphTitle">
                    {this.props.title}
                    <div className='graphSubtitle'>{this.props.subtitle}</div>
                </p>
                <BarTitle1 barTitle1={this.props.barTitle1} barDetail1={this.props.barDetail1}/>
                <bar/>
                <BarTitle2 barTitle2={this.props.barTitle2} barDetail2={this.props.barDetail2}/>
                <Social/>*/}
            </div>
        )
    }
});
//Mixed Combonent (Text + 2 bar)
var MixedGraphCard = React.createClass({
    render: function() {
        return (
            <div className="graphText">
                {/*<p className='halfText'>{this.props.text}</p>
                <BarTitle1/>
                <BarDetail1/>
                <Bar/>
                <BarTitle2/>
                <BarDetail2/>
                <Social/>
                <Bar/>*/}
            </div>
        )
    }
});
//Where everything goes in
var MainBody = React.createClass({
    getInitialState: function() {
        return {graphdata: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: "/data.json",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({graphdata: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("/data.json", status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var BarGraphs = []
        BarGraphs = this.state.graphdata.map(function(data, index) {
            return (<BarGraphCard data={data} key={index}/>)
        }.bind(this));
        console.log()
        return (
            <div className='bigBox'>
                <MainTitle/>
                <div className='cardBox'>
                    {/*first row*/}
                    {BarGraphs[0]}
                    <RedCard text='51' subtitle='Homicides in Chicago in January 2016'/>
                    <TextCard id='a3' text='America now has more wealth and income inequality than any major developed country on earth'/> {/*second row*/}
                    {BarGraphs[1]}
                    <PieGraphCard title='PIE CHART INFO' subtitle='DATA MUST SUM UP TO 100%'/>
                    <LineGraphCard title='PLACEHOLDER TITLE' subtitle='IN MILLIONS OF DOLLARS (USD)'/> {/*third row*/}
                    <RedCard text='224' subtitle='Unarmed People Killed by Police in 2015'/>
                    <MixedGraphCard text='More Americans killed by guns since 1968 than in all U.S. wars combined' barTitle1='GUN-RELATED DEATHS' barDetail1='1,516,863' barTitle2='WAR DEATHS' barDetail2='1,396,733'/> {BarGraphs[2]}
                    <TextCard text='The FBI is encouraging, pressuring, and sometimes paying people to commit terrorist acts.'/>
                    <RedCard text='38.2%' subtitle='Of Black Children Live in Poverty'/>
                </div>
            </div>
        )
    }
});
ReactDOM.render(
    <MainBody/>, document.getElementById('main'));
//========= Animation for the mobile view and minimum font-size cap =========
$(document).ready(function() {
    /*---declaring the resizing functions---*/
    var titleResize = function() {
        if (parseInt($('#title').css('font-size')) < 30) {
            $('#title').css('font-size', '30px');
        } else if ($(window).width() > 560 && parseInt($('#title').css('font-size')) === 30) {
            $('#title').css('font-size', '7.22vmin');
        }
    }
    var subtitleResize = function() {
        if (parseInt($('#subtitle').css('font-size')) < 13) {
            $('#subtitle').css('font-size', '13px');
        } else if ($(window).width() > 560 && parseInt($('#subtitle').css('font-size')) === 13) {
            $('#subtitle').css('font-size', '2.2vmin');
        }
    };
    var boxResize = function() {
        if ($(window).width() <= 560) {
            $('#title').css('padding-top', '30px');
            $('.titleBox').css('height', '160px')
            $('#subtitle').css('width', '200px');
            $('#subtitle').css('margin-left', 'auto');
            $('#subtitle').css('margin-right', 'auto');
            $('.cardBox').css('margin-top', '20px');
        } else {
            $('#title').css('padding-top', '93px');
            $('.titleBox').css('height', '382px')
            $('#subtitle').css('width', 'auto');
            $('#subtitle').css('margin-left', 'auto');
            $('#subtitle').css('margin-right', 'auto');
            $('.cardBox').css('margin-top', '-60px');
        }
    };
    /*--- directly on page load ---*/
    titleResize();
    subtitleResize();
    boxResize();
    /*--- when user resizes the window ---*/
    $(window).on('resize', function() {
        titleResize();
        subtitleResize();
        boxResize();
    })
});
