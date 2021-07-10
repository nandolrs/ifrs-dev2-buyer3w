import React from 'react';
import axios from 'axios';


class SisManterView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
              visao:props.visao
            , url:props.url
            ,entidade:props.entidade
            ,entidadeExcluir:props.entidadeExcluir
            ,id:props.id
        };
    }

    Pesquisar(entidade)
    {
/*
        axios.post(this.props.url.pesquisar
            ,entidade
            ,window.getCabeca()
        )   
        .then((resposta)=>this.Pesquisou(resposta))
        .catch((resposta) => this.Pesquisou(resposta));
*/

        let p = entidade.p != '' ? '?'+entidade.p : '';

        axios.get(this.props.url.pesquisar + p
            ,window.getCabeca()
        )   
        .then((resposta)=>this.Pesquisou(resposta))
        .catch((resposta) => this.Pesquisou(resposta));


    }

    PesquisarParaListar(entidade)
    {
        axios.get(this.props.url.pesquisarParaListar
            ,window.getCabeca()
        )
        .then((resposta)=>this.Pesquisou(resposta))
        .catch((resposta) => this.Pesquisou(resposta));
    }

    Listar(entidade)
    {
        axios.post(this.props.url.listar
            ,entidade
            ,window.getCabeca()
            .then((resposta)=>this.Pesquisou(resposta))
            .catch((resposta) => this.Pesquisou(resposta))
            );
    }

    Pesquisou(resposta)
    {
        var retorno = null;

        if(resposta.status == 200)
        {   
            var erro = resposta.erro;
            if(erro != null)
            {
                var itens = erro.itens;
                var msg = itens[0].mensagem;
                retorno = {visao:"mensagem.erro"
                  , mensagens:erro.itens
                };
            }
            else
            {

                retorno = {visao:"listar"
                    ,entidade:resposta.data.dadosLista
                    ,mensagens:window.ToMensagens("Pesquisa retornou com sucesso.")
                };
            }
            
        }
        else
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Erro ao pesquisar registro, repita a operação.")
            };
        }


        this.props.OnEvento(retorno, 'pesquisou');

    }

    Consultar(id)
    {
        axios.get(this.props.url.consultar+id
            ,window.getCabeca()
            )
            .then((resposta)=>this.Consultou(resposta))
            .catch((resposta) => this.Consultou(resposta));
    }

    ConsultarPost(entidade)
    {

        axios.post(this.props.url.consultarPOST
            ,entidade
            ,window.getCabeca())
        .then((resposta)=>this.Consultou(resposta))
        .catch((resposta) => this.Consultou(resposta))
        ;    
    }

    Consultou(resposta)
    {
        var retorno = null;

        if(resposta.status == 200)
        {   
            var erro = resposta.data.erro;
            if(erro != null)
            {
                var itens = erro.itens;
                var msg = itens[0].mensagem;
                retorno = {visao:"mensagem.erro"
                  , mensagens:erro.itens
                };
            }
            else
            {
                retorno = {visao:"consultar"
                    ,entidade:resposta.data.dados
                    ,entidadePesquisa:resposta.data.dados
                    ,mensagens:window.ToMensagens("Consulta retornou com sucesso.")
                };
            }
            
        }
        else
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Erro ao consultar registro, repita a operação.")
            };
        }


        this.props.OnEvento(retorno, 'consultou');
    }

    Salvar(entidade)
    {
        debugger;

        if(entidade.id==0)
        {
            axios.post(this.props.url.salvar
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
        else
        {
            axios.post(this.props.url.salvar
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
    }

    Salvou(resposta)
    {
        debugger;

        var retorno = null;

        if(resposta.request.status == 200)
        {
            var erro = resposta.data.erro;
            if(erro != null)
            {
                var itens = erro.itens;
                var msg = itens[0].mensagem;
                retorno = {visao:"mensagem.erro"
                  , mensagens:erro.itens
                };
            }
            else
            {
                retorno = {visao:"mensagem.sucesso"
                  ,mensagens:window.ToMensagens("Registro salvo com sucesso.")
                };
            }
        }
        else
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Erro ao salvar registro, repita a operação.")
            };
        }


        this.props.OnEvento(retorno, 'salvou');
    }

    Outros(entidade)
    {
        
        if(entidade.id==0)
        {
            axios.post(this.props.url.outros
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
        else
        {
            axios.put(this.props.url.outros
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }


    }

    Excluir(entidade)
    {
        debugger;

        axios.delete(this.state.url.excluir + entidade
            ,entidade
            ,window.getCabeca())
            .then((resposta)=>this.Excluiu(resposta))
            .catch((resposta => this.Excluiu(resposta))
            );

    }

    Excluiu(resposta)
    {      
        debugger;

        var retorno = null;

        if(resposta.request.status == 200)
        {
            var erro = resposta.data.erro;
            if(erro != null)
            {
                var itens = erro.itens;
                var msg = itens[0].mensagem;
                retorno = {visao:"mensagem.erro"
                  , mensagens:erro.itens
                };
            }
            else
            {
                retorno = {visao:"mensagem.sucesso"
                  ,mensagens:window.ToMensagens("Registro excluido com sucesso.")
                };
            }
        }
        else
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Erro ao excluir registro, repita a operação.")
            };
        }

    
        this.props.OnEvento(retorno, 'excluiu');
    }

    render()
    {
        if(this.props.visao=="manter.pesquisar")
        {
            this.Pesquisar(this.props.entidade);
        }
        if(this.props.visao=="manter.pesquisarParaListar")
        {
            this.PesquisarParaListar(this.props.entidade);
        }
        if(this.props.visao=="manter.consultar")
        {
            if(this.props.url.consultarPOST != null)
            {
                this.ConsultarPost(this.props.entidade);
            }
            else
            {
                this.Consultar(this.props.entidade);
            }
        }
        if(this.props.visao=="manter.salvar")
        {
            this.Salvar(this.props.entidade);
        }
        if(this.props.visao=="manter.excluir")
        {
            this.Excluir(this.props.entidadeExcluir);
        }

        if(this.props.visao=="manter.outros")
        {
            this.Outros(this.props.entidade);
        }

        return(
            <div class="text-center">
                <div class="spinner-border" role="status">
                </div>
            </div>
        );

    }
}

export default SisManterView;