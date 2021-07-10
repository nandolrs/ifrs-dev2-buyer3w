import React from 'react';
import LocalView from '../Local/LocalView';

import { isNumericLiteral } from '@babel/types';
import axios from 'axios';

//import ReactGA from 'react-ga';


class MaestroView extends React.Component
{
    constructor()
    {
        super();
        
        this.state={
            visao: null 
       };
       
    }


    render()
    {
        return(
            <div>
                {window.location.pathname=='/local' ?
                    <LocalView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnIniciar={()=>this.Iniciar()}
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 

                    />
                : "" 
                }
            </div>
        );

    }
    
}

export default MaestroView;
