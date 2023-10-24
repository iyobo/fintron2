import React, {useCallback, useEffect, useState} from 'react';
import './App.css';

// Normally, would use a component lib and split this into List, ListItem, SearchableList combined, etc

type Stock = {
  name: string
  companyName: string
  price: number
  deltaVal: number
  deltaPercent: number
  // logo, currency
}

function App() {
  // Normally, would be fetched or prop not state.
  const [data, setData] = useState<Stock[]>([
    {name: 'AAPL', companyName: 'Apple Inc', price: 15281, deltaVal: 0.80, deltaPercent: 1.21},
    {name: 'MSFT', companyName: 'Microsoft Corp', price: 25241, deltaVal: -1.74, deltaPercent: -0.68},
    {name: 'GOOGLE', companyName: 'alphabet Inc', price: 9552, deltaVal: 1.66, deltaPercent: 1.77},
  ]);

  // Normally, filtering would be backend. Would just render as received from backend
  const [filteredItems, setFilteredItems] = useState<Stock[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    setFilteredItems(data);
  }, []);

  useEffect(() => {
    setFilteredItems(data.filter(it => it.name.toLowerCase().includes(filter.toLowerCase()) || it.companyName.toLowerCase().includes(filter.toLowerCase())));
  }, [filter]);

  const onfilterChange = useCallback((evt: any) => {
    setFilter(evt.target.value);
  }, [filter]);


  return (
    <div className="App">

      <div className="list">
        <div>
          <input value={filter} onChange={onfilterChange} className="searchBox" placeholder="Seach by name or symbol"/>
        </div>
        {filteredItems.map(stock => {
          return <div className="listItemOuter">
            <div className="listItem">
              <div className="flex">
                {/* feed logo as listitem data*/}
                <div className="logo" style={{backgroundImage: '...'}}/>
                <div>
                  <div className="name">{stock.name}</div>
                  <div className="companyName">{stock.companyName}</div>
                </div>
              </div>
              <div className="money">
                <div className="price">${(stock.price / 100).toFixed(2)}</div>
                <div className="delta">
                  <div className="val" style={{color: stock.deltaVal > 0 ? 'grey' : 'grey'}}>${stock.deltaVal}</div>
                  <div className="perc" style={{color: 'grey'}}>({stock.deltaPercent}%)
                  </div>
                </div>
              </div>
            </div>
          </div>;
        })}
      </div>
    </div>
  );
}

export default App;
