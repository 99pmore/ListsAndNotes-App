import { useEffect, useState } from "react";
import { Card } from "./Card"

import { db, auth } from "../config/firebase";
import { onValue, ref } from "firebase/database";

export const Content = ({ user }) => {

    const [info, setInfo] = useState([])
    const [lists, setLists] = useState([])
    const [notes, setNotes] = useState([])

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (user) {
            getData()

        } else {
            setNotes([])
            setLists([])
            setInfo([])
        }
    }, [user])

    const getData = () => {
        if (user) {
            const dbRefList = ref(db, `users/${user.uid}/info/lists/`)
    
            onValue(dbRefList, (snapshot) => {
                let lists = []
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val()
                    lists.push(data)
                })
        
                setLists(lists)
    
                const dbRefNotes = ref(db, `users/${user.uid}/info/notes/`)
        
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