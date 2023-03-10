import { getTopicById, getTopicsByCategory } from '../../shared/service';
import { useEffect, useState} from 'react';
import Grid from '@mui/material/Grid'; // Grid version 1
import Item from '@mui/material/Grid';
import { Typography, Box, Stack, Chip, List, ListItem, ListItemText, Divider} from '@mui/material';
import {} from '@mui/icons-material/';
import {} from './tema.css';

export const Tema = () =>{

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [url, setUrl] = useState(null);
    const [tags, setTags] = useState(null);
    const [author, setAuthor] = useState(null);
    const [date, setDate] = useState(null);
    const [dateUpdate, setDateUpdate] = useState(null);
    const [category, setCategory] = useState(null);
    const [categoryID, setCategoryID] = useState(null);
    const [titleTopic, setTitleTopic] = useState(null);
 
    useEffect(() => {
        const getTheme = async () => {
            const id = 1;
            const response = await getTopicById(id);
            const title = response.title;
            const description = response.description;
            const url = response.image;
            const tags = response.tags;
            const author = response.author;
            const date = response.publishDate;
            const updateDate = response.updateDate;
            const category = response.category.title;
            const categoryID = response.category.id;
            
            setTitle(title);
            setDescription(description);
            setUrl(url);
            setTags(tags);
            setAuthor(author);
            setDate(date);
            setDateUpdate(updateDate);
            setCategory(category);
            setCategoryID(categoryID);
            
        };
        getTheme();
    }, []);

    useEffect(()=>{
        const getThemeByCategory = async () => {
            const responseTopic = await getTopicsByCategory(categoryID);
            const titleTopic = responseTopic;
            console.log("responseTopic", titleTopic);
            setTitleTopic(titleTopic);
        };
        getThemeByCategory();
    }, []);

    let dateUpd;
    if(dateUpdate != undefined){
        dateUpd = <Typography variant="caption">{`Modificado el ${new Date(dateUpdate).toLocaleDateString("es-cl")}`}</Typography>
    }

    return (
        <div>
            <Grid container spacing={0.5} padding={5}>
                <Grid xs={3} marginRight={10}>
                    <Box>
                        <ListItem button className='title-theme' >
                            <Typography variant="h4" noWrap overflow="visible" padding={5}>
                                {category}
                            </Typography>
                        </ListItem>
                        <List>
                            {titleTopic?.map(e=>(
                                <ListItem button divider>
                                    <ListItemText primary={e.title}/>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
                <Grid xs={5}>
                    <Box display='flex' flexDirection='column'>
                        <Item>
                            <Typography variant="h4" noWrap overflow="visible" padding={5} className="title-theme">
                                {title}
                            </Typography>
                        </Item>
                        <Box boxShadow={3} width="100%" overflow="hidden" className="contenido">
                            <Item>
                                <Typography variant="body1" overflow="visible" textAlign="justify" padding={5}>
                                    {description}
                                </Typography>
                            </Item>
                            <Item marginBottom={5} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                {
                                    <Stack direction="row" spacing={1}>
                                        {tags?.map(e=>(
                                            <Chip label={e} className="tags"></Chip>
                                        ))}
                                    </Stack>
                                }
                            </Item>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={2.5} marginTop={15}>
                    <Item marginLeft={5} className="img-theme">
                        <img src={url} ></img>
                    </Item>
                    <Item height={50}>
                        <Typography variant="body1" overflow="visible" textAlign="justify" marginTop={5} marginLeft={5}>
                            {`Categoría: ${category}`}   
                        </Typography>
                    </Item>
                    <Item marginLeft={5}>
                        <Typography variant="caption" display={"block"} paddingBottom={2}>
                        {`Publicado por: ${author} el ${new Date(date).toLocaleDateString("es-cl")}`}
                        </Typography>
                        {dateUpd}
                    </Item>
                    
                </Grid>
            </Grid>    
        </div>
        
    )
}