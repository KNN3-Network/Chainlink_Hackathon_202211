import { useEffect } from 'react';
import * as echarts from 'echarts';

const ChartLine = (props: any) => {
    const { optionsData = null, id = 'default-id', width = 600, height = 200 } = props;
    useEffect(() => {
        const option = {
            legend: {
                data: ['Raw Data Service', 'Customized Aggregati', 'Algorithm Ready to U', 'Customized Algorithm'],
                bottom:'20'
              },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(0, 255, 233,0)'
                            }, {
                                offset: 0.5,
                                color: 'rgba(255, 255, 255,1)',
                            }, {
                                offset: 1,
                                color: 'rgba(0, 255, 233,0)'
                            }],
                            global: false
                        }
                    },
                },
            },
            grid: {
                top: '10',
                left: '40',
                right: '40',
                bottom: '80',
                // containLabel: true
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: '#999999'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#999999'
                    }
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                data: ["2020-06-21", "2020-06-22", "2020-06-23", "2020-06-24", "2020-06-25", "2020-06-26", "2020-06-27"]//this.$moment(data.times).format("HH-mm") ,

            }],

            yAxis: [{
                type: 'value',
                min: 0,
                // max: 140,
                splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#999999',
                        opacity: 0.23
                    }
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999999'
                    }
                },
                axisTick: {
                    show: false,
                },
            }],
            series: [
                {
                    name: 'Raw Data Service',
                    type: 'line',
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            color: "#00C203",
                        },
                    },
                    label: {
                        show: false,
                        position: 'top',
                        textStyle: {
                            color: '#00C203',
                        }
                    },
                    itemStyle: {
                        color: "#fff",
                        borderColor: "#00C203",
                        borderWidth: 2,
                    },
                    data: [400, 700, 500, 400, 300, 500, 800]//data.values
                },
                {
                    name: 'Customized Aggregati',
                    type: 'line',
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            color: "#E800FF",
                        },
                    },
                    label: {
                        show: false,
                        position: 'top',
                        textStyle: {
                            color: '#E800FF',
                        }
                    },
                    itemStyle: {
                        color: "#fff",
                        borderColor: "#E800FF",
                        borderWidth: 2,
                    },
                    data: [300, 500, 400, 200, 100, 700, 600]//data.values
                },
                {
                    name: 'Algorithm Ready to U',
                    type: 'line',
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            color: "#FF0000",
                        },
                    },
                    label: {
                        show: false,
                        position: 'top',
                        textStyle: {
                            color: '#FF0000',
                        }
                    },
                    itemStyle: {
                        color: "#fff",
                        borderColor: "#FF0000",
                        borderWidth: 2,
                    },
                    data: [400, 300, 400, 200, 500, 700, 400]//data.values
                },
                {
                    name: 'Customized Algorithm',
                    type: 'line',
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            color: "#003DFF",
                        },
                    },
                    label: {
                        show: false,
                        position: 'top',
                        textStyle: {
                            color: '#003DFF',
                        }
                    },
                    itemStyle: {
                        color: "#fff",
                        borderColor: "#003DFF",
                        borderWidth: 2,
                    },
                    data: [700, 500, 200, 600, 100, 500, 300]//data.values
                },
            ]
        };
        const HTMLElement = document.getElementById(id) as HTMLElement;
        const chart = echarts.init(HTMLElement);
        chart.setOption(option);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionsData]);
    return (
        <div id={id} style={{ width: width, height: height }}>222</div>
    );
};

export default ChartLine;
