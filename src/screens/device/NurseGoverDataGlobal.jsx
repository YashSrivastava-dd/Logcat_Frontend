import React, { useCallback, useEffect, useState } from 'react';
import Style from "../../css/SearchBar.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getIllnessDataAction } from '../../store/action/StoreSystem';

const NurseGoverDataGlobal = (props) => {
    const [query, setQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const getIllnessDataReducer = useSelector((state) => state.getIllnessDataReducer);
    const { loading, data } = getIllnessDataReducer;
    const dispatch = useDispatch()

    const debounce=(func)=>{
        let timer;
        return function(...args){
            const context=this;
            if(timer) clearTimeout(timer)
            timer=setTimeout(()=>{
                timer=func.apply(context,args);
            },500);
        }
    }
    // use callback() provide use the memorized value.


    useEffect(() => {
        const page = '';
        const limit = '';
        const search = query;
        dispatch(getIllnessDataAction(page, limit, search))
    }, [query])
    const handleChange = (event) => {
        setQuery(event.target.value);
    };
    
    const optimisedVersin=useCallback(debounce(handleChange),[]) ;

    const handleKeyPress = (event) => {
        event.preventDefault();
        setQuery(event.target.textContent)
        const selectedValue = event.target.textContent;
        const selectedItem = data?.find(result => result.desc === selectedValue);
        if (selectedItem) {
            setSelectedItems(prevSelectedItems => [...prevSelectedItems, selectedItem.desc]);
            setQuery('')
        }
    };
    props.onData(selectedItems);
    return (
        <div>
            <lable for="diagnose" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Admiting diagnose</lable>
            <input
                list="data"
                type="text"
                autoComplete='off'
                placeholder="Enter illness or ICD9 code"
                value={query}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
            />

            {selectedItems?.length > 0 ?
                <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                    {selectedItems?.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </div>
                : ''}
            {query?.length > 0 && data?.length > 0 ?
                <section className={Style.search_section}>
                    <div className={Style.search_result}>
                        {data?.map((item, index) => (
                            <span id="clickable-span" onClick={handleKeyPress} data-value="your-value" key={index} target='_blank' className={Style.search_suggestion_line}>
                                {item.desc}
                            </span>
                        ))}
                        {loading && <span className={Style.search_suggestion_line}>
                            Loading...
                        </span>}
                    </div>
                </section>
                : ''}
        </div>
    )
};

export default NurseGoverDataGlobal