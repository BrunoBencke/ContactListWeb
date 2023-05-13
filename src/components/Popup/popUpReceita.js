import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button, Grid, CircularProgress, TextField, FormLabel, Select, MenuItem } from '@mui/material';
import Iconify from '../Icon/Iconify';
import Close from "../Button/close";
import Accept from "../Button/accept";
import Back from "../Button/back";
import Card from "../../components/Card/index";
import { ContainerGrid, CardLine } from "./styles";
import IngredientsContext from "../../contexts/cards";
import produce from "immer";
import { styled } from "@mui/material/styles";
import { PopupIngredientes } from './popUpIngredientes';

export const PopupReceita = (props) => {

    const { openPopupReceita, setOpenPopupReceita, receita, setReceita, setOpenPopupToken, fetchData } = props;

    const [openPopupIngredientes, setOpenPopupIngredientes] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [ingredients, setIngredients] = useState([]);
    const [removeItens, setRemoveItens] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!openPopupReceita) {
            setIsLoading(true);
            setReceita({ name: "", lastName: "" });
            setIngredients([]);
            setError("");
            return;
        }

        const token = localStorage.getItem('user_token');

        if (receita.id !== '') {

            const requestInfo = {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'/*,
                    'Authorization': `Bearer ${token}`*/
                }),
                body: JSON.stringify(receita)
            };

            fetch(process.env.REACT_APP_BASE_URL + "/contact/" + receita.id, requestInfo)
                .then(response => {
                    if (response.status === 401) {
                        setOpenPopupToken(true);
                    }
                    return response.json();
                })
                .then((json) => {
                    setIngredients(json);
                    setIsLoading(false);
                })
                .catch((error) => console.log(error));

            //setContact(ingredients[0]);

        } else {
            setReceita({ id: '', description: '', version: '' })
            setIngredients([]);
            setIsLoading(false);
        }
    }, [openPopupReceita]);

    const filtrar = (version) => {

        setIsLoading(true);

        const token = localStorage.getItem('user_token');

        if (receita.id !== '') {
            const requestInfo = {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }),
                body: JSON.stringify({ id: receita.id, description: receita.description, version: version })
            };

            fetch(process.env.REACT_APP_BASE_URL + "/recipeIngredients/" + receita.id, requestInfo)
                .then(response => {
                    if (response.status === 401) {
                        setOpenPopupToken(true);
                    }
                    return response.json();
                })
                .then((json) => {
                    setIngredients(json);
                    //setContact(version);
                    setIsLoading(false);
                })
                .catch((error) => console.log(error));
        }
    }

    const fechar = () => {
        setOpenPopupReceita(false);
    }

    const adicionarIngredientes = () => {
        setOpenPopupIngredientes(true);
    }

    function move(from, to) {
        setIngredients(
            produce(ingredients, (draft) => {
                const dragged = draft[from];
                draft.splice(from, 1);
                draft.splice(to, 0, dragged);
            })
        );
    }

    function addItemToRecipe(obj) {
        setIngredients([...ingredients, obj[0]]);
    }

    function verifyIndex(id) {
        const obj = ingredients.filter((x) => x.id == id);

        const lenght = obj.length;

        if (lenght > 0) {
            return true;
        }
        return false;
    }

    function addItemToDelete(obj) {
        setRemoveItens([...removeItens, obj]);
    }

    function removeItemToDelete(obj) {
        setRemoveItens(removeItens.filter((x) => x.id !== obj.id));
    }

    function removeIngredients() {
        setIngredients(ingredients.filter(e => !removeItens.includes(e)));
        setRemoveItens([]);
    }

    function mapItens() {
        if (ingredients.length > 0) {
            return (
                <ContainerGrid>
                    <CardLine>
                        <Grid container spacing={1} sx={{ justifyContent: "space-between" }}>
                            <Grid item xs={2} sx={{ textAlign: "center" }}>
                                Selecionar
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: "center" }}>
                                Ordenar
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: "center" }}>
                                Sequência
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: "center" }}>
                                Código
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: "left" }}>
                                Item
                            </Grid>
                        </Grid>
                    </CardLine>
                    {
                        ingredients?.map((ingredient, index) => (
                            <Card key={ingredient.id} index={index} data={ingredient} />
                        ))
                    }
                </ContainerGrid>
            )
        }
    }

    function menuItem(i) {
        return (
            <MenuItem key={i} value={i}>{i}</MenuItem>
        );
    }

    function editarReceita(value) {
        setReceita({ ...receita, description: value })
    }

    const RemoveButton = styled(Button)(() => ({
        color: "#FF4F4F",
        backgroundColor: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#FFFFFF",
            color: "#FF0000"
        }
    }));

    const AddButton = styled(Button)(() => ({
        color: "#0074FF",
        backgroundColor: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#FFFFFF",
            color: "#0008FF"
        }
    }));

    const atualizarReceita = () => {

        if (ingredients.length === 0) {
            setError("Adicione os ingredientes!");
            return;
        }

        if (receita.description === "") {
            setError("Adicione um nome para a receita");
            return;
        }

        const token = localStorage.getItem('user_token');

        if (receita.id !== '') {

            const requestInfo = {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }),
                body: JSON.stringify({ receita, ingredients })
            };

            fetch(process.env.REACT_APP_BASE_URL + "/recipeIngredient/" + receita?.id, requestInfo)
                .then(response => {
                    if (response.ok) {
                        fetchData();
                        setOpenPopupReceita(false);
                    } else {
                        if (response.status === 401) {
                            setOpenPopupToken(true);
                        }
                        alert('Não foi possível atualizar a receita!')
                    }
                })
        } else {

            const requestInfo = {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }),
                body: JSON.stringify({ receita, ingredients })
            };

            fetch(process.env.REACT_APP_BASE_URL + "/recipeIngredient/" + 0, requestInfo)
                .then(response => {
                    if (response.ok) {
                        fetchData();
                        setOpenPopupReceita(false);
                    } else {
                        if (response.status === 401) {
                            setOpenPopupToken(true);
                        }
                        alert('Não foi possível inserir receita!')
                    }
                })
        }
    };

    return (
        <IngredientsContext.Provider
            value={{ move, addItemToDelete, removeItemToDelete }}
        >
            <div>
                <Dialog maxWidth="xlg" open={openPopupReceita} style={{ height: 800 }}>
                    <div>
                        <DialogTitle>
                            <div style={{ display: 'flex' }}>
                                <Typography variant="h6" component="div" style={{ flexGrow: 1, width: 550 }}>
                                    Pessoa
                                </Typography>
                                <Close
                                    onClick={() => fechar()}><Iconify icon="fa:close" />
                                </Close>
                            </div>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container sx={{ alignItems: "center" }}>
                                <FormLabel>Nome:</FormLabel>
                                <TextField disabled size="small" sx={{ width: 120, marginLeft: 2 }} value={receita.name}></TextField>
                                <FormLabel sx={{ marginLeft: 2 }}>Sobrenome:</FormLabel>
                                <TextField size="small" sx={{ width: 120, marginLeft: 2 }}
                                    value={receita.lastName}
                                    onChange={description => editarReceita(description.target.value)}>
                                </TextField>
                            </Grid>
                            <ContainerGrid>
                                <Grid container spacing={1} sx={{ justifyContent: "space-between", marginTop: "10px" }}>
                                    <AddButton
                                        onClick={() => { adicionarIngredientes() }}
                                        startIcon={
                                            <Iconify icon="material-symbols:add-box-outline" />
                                        }>
                                        Adicionar Contato
                                    </AddButton>
                                    <RemoveButton
                                        onClick={() => {
                                            removeIngredients();
                                        }}
                                        startIcon={
                                            <Iconify icon="material-symbols:playlist-remove-rounded" />
                                        }
                                    >
                                        Remover Contato
                                    </RemoveButton>
                                </Grid>
                                {isLoading ? (
                                    <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                                        <CircularProgress />
                                    </Grid>
                                ) : (
                                    mapItens()
                                )}
                            </ContainerGrid>
                            <Accept variant="contained" type="button" style={{ marginTop: '2vh', height: '5vh' }}
                                onClick={() => atualizarReceita()}>
                                <Iconify icon="line-md:confirm" sx={{ width: 25, height: 25 }} />
                            </Accept>
                            <Back variant="outlined" type="button" style={{ marginTop: '2vh', marginLeft: '4vh', height: '5vh' }}
                                onClick={() => fechar()}>
                                <Iconify icon="clarity:cancel-line" sx={{ width: 25, height: 25 }} />
                            </Back>
                            <FormLabel style={{ marginLeft: '3vh' }}>{error}</FormLabel>
                        </DialogContent>
                    </div>
                </Dialog>
                <div>
                    <PopupIngredientes
                        openPopupIngredientes={openPopupIngredientes}
                        setOpenPopupIngredientes={setOpenPopupIngredientes}
                        addItemToRecipe={addItemToRecipe}
                        verifyIndex={verifyIndex}
                        setErrorProp={setError}
                    >
                    </PopupIngredientes>
                </div>
            </div >
        </IngredientsContext.Provider >
    )
}