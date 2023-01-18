import { useEffect, useState } from "react";
import { Card } from "./Card"

import { db } from "../config/firebase";
import { onValue, ref } from "firebase/database";

export const Content = () => {

    const [info, setInfo] = useState([])
    const [lists, setLists] = useState([])
    const [notes, setNotes] = useState([])

    useEffect(() => {
        getData()
    }, [])


    const getData = () => {
        const dbRefList = ref(db, 'info/lists/')
    
        onValue(dbRefList, (snapshot) => {
            let lists = []
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val()
                lists.push(data)
            })
    
            setLists(lists)

            const dbRefNotes = ref(db, 'info/notes/')
    
            onValue(dbRefNotes, (snapshot) => {
                let notes = []
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val()
                    notes.push(data)
                })
    
                setNotes(notes)

                setInfo([...lists, ...notes])
            })
        })
    }

    return (
        <div className="content">
            <div className="notes">
                {
                    info.map((item, index) => (
                        <Card key={ index } title={ item.title } body={ item.body } items={ item.items } />
                    ))
                }
            </div>
        </div>
    )
}