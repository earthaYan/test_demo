import { FilterOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Space, Tag, Typography } from 'antd';
import classNames from 'classnames';
import { useMemo } from 'react';

import './index.css';

const TableFilterContainer= (props) => {

  const getFilterNum = (filterInfo) => {
    let num = 0;
    for (const key in filterInfo) {
      if ((filterInfo?.[key]?.length ?? 0) > 0) {
        num += 1;
      }
    }
    return num;
  };

  const visible = useMemo(() => {
    let num = 0;
    props.filterInfos.forEach((filterInfo) => {
      num += getFilterNum(filterInfo.filters);
    });
    return num > 0;
  }, [props.filterInfos]);

  const renderTag = (filterInfo, filterKey) => {
    if (
      !filterInfo.filters?.[filterKey] ||
      !filterInfo.filters?.[filterKey]?.length
    ) {
      return null;
    }
    const customRenderList = Object.keys(filterInfo.customRender ?? {});
    if (customRenderList.includes(filterKey)) {
      return filterInfo.customRender?.[filterKey](
        filterInfo.filters?.[filterKey] ?? [],
        filterInfo.name,
        filterKey
      );
    }

    const isNotString = filterInfo.filters?.[filterKey]?.some(
      (item) => typeof item !== 'string'
    );

    if (isNotString && filterKey !== filterInfo.tagKeyName) {
      return null;
    }
    if (filterKey === filterInfo.tagKeyName) {
      return createTagFilterTag(
        filterInfo.filters?.[filterKey] ?? [],
        filterInfo.name,
        filterKey,
        isNotString
      );
    }
    const filterVal = filterInfo.filters?.[filterKey]?.join(',') ?? '';
    const keyDic = filterInfo.dataIndexDictionary || {};
    const valDic = filterInfo.filterValDictionary?.[filterKey] || {};
    return (
      <Tag
        key={`${filterKey}-${filterVal}`}
        closable={true}
        color="blue"
        onClose={() => {
          props.removeFilter?.(filterInfo.name, filterKey);
        }}
      >
        {keyDic[filterKey] ?? filterKey}:{valDic[filterVal] ?? filterVal}
      </Tag>
    );
  };
  const createTagFilterTag = (
    tagFilter,
    name,
    filterKey,
    isNotString
  ) => {
    if (isNotString) {
      return createMultipleTagList(tagFilter, name, filterKey);
    }
    const tagProps = {
      key: `${tagFilter[0]}-${tagFilter[1]}`,
      closable: true,
      color: 'blue',
      onClose: () => {
        props.removeFilter?.(name, filterKey);
      },
    };
    if (tagFilter[1] === '') {
      if (tagFilter[2] === '1') {
        return (
          <Tag {...tagProps}>
            反选分类:{tagFilter[0]}
          </Tag>
        );
      }
      return (
        <Tag {...tagProps}>
          标签分类: {tagFilter[0]}
        </Tag>
      );
    }
    return (
      <Tag {...tagProps}>
       标签: {tagFilter[0]}:{tagFilter[1]}
      </Tag>
    );
  };
  const createMultipleTagList = (
    tagFilter ,
    name,
    filterKey
  ) => {
    return tagFilter.map((item, index) => {
      const tagProps = {
        closable: true,
        color: 'blue',
        onClose: () => {
          props.removeFilter?.(name, filterKey, index);
        },
      };
      return (
        <Tag {...tagProps} key={`${item.attribute}-${item.value}`}>
         标签: {item.attribute}:{item.value}
        </Tag>
      );
    });
  };

  return (
    <section className="action-sky-table-footer-filter-container">
      <div className="table-footer-container" hidden={!visible}>
        <div className="left-container">
          <section className="table-footer-wrapper">
            <section className="table-footer-title">
              <Typography.Title level={4}>
                <Space align="center">
                  <FilterOutlined />
                 筛选条件
                </Space>
              </Typography.Title>
              <Divider type="vertical" className="right-split-line" />
            </section>
            <section className="table-footer-content">
              <Space
                size={10}
                direction="vertical"
                className="full-width-element"
                style={{
                  justifyContent: 'center',
                  minHeight: '100%',
                }}
              >
                {props.filterInfos.map((filterInfo) => {
                  if (getFilterNum(filterInfo.filters) === 0) {
                    return null;
                  }
                  return (
                    <Row className="left-container" key={filterInfo.name}>
                      <Col
                        {...filterInfo.titleColSpan}
                        className={classNames(
                          'filter-label',
                          filterInfo.titleColSpan?.className
                        )}
                      >
                        {filterInfo.title ? `${filterInfo.title}:` : ''}
                      </Col>
                      <Col
                        {...filterInfo.tagsWrapColSpan}
                        className={classNames(
                          'filter-value',
                          filterInfo.tagsWrapColSpan?.className
                        )}
                      >
                        {Object.keys(filterInfo.filters).map((filterKey) => {
                          return renderTag(filterInfo, filterKey);
                        })}
                      </Col>
                    </Row>
                  );
                })}
              </Space>
            </section>
          </section>
        </div>
        <Button
          type="primary"
          onClick={() => {
            props.clearAllFilter?.();
          }}
        >
         清理全部
        </Button>
      </div>
      {props.children ? (
        <>
          <div className="bottom-split-line">
            <Divider type="horizontal" />
          </div>
          {props.children}
        </>
      ) : null}
    </section>
  );
};

export default TableFilterContainer;
