import React from 'react';
import LocalView from '../Local/LocalView';
import ClasseView from '../Classe/ClasseView';
import ProdutoView from '../Produto/ProdutoView';
import EmbalagemView from '../Embalagem/EmbalagemView';
import UnidadeMedidaView from '../UnidadeMedida/UnidadeMedidaView';

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
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                    />
                : "" 
                }

                    {window.location.pathname=='/embalagem' ?
                    <EmbalagemView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                    />
                : "" 
                }   

                {window.location.pathname=='/UnidadeMedida' ?
                    <UnidadeMedidaView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                    />
                : "" 
                }   

                {window.location.pathname=='/classe' ?
                    <ClasseView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                    />
                : "" 
                }

                {window.location.pathname=='/produto' ?
                    <ProdutoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                    />
                : "" 
                }


            </div>
        );

    }
    
}

export default MaestroView;
