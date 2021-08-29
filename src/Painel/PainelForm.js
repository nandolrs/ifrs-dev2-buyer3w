import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'
import FormBotoesDetalhe from '../SisPadrao/FormBotoesDetalhe'

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class PainelForm extends React.Component
{
    constructor(props)
    {        
        super(props);
        /*
        if(this.props.entidade.id==0)
        {
            this.state={
                 id:0
                ,nome:''
                ,visao:process.env.REACT_APP_VISAO_INFORMANDO
                ,mensagens:null

            };
        }
        else
        {             
            this.state={
                id:this.props.entidade.id
               ,visao:'processando'
               ,mensagens:null

           };
           let entidade = {id:this.props.entidade.id}

           //this.SisManterConsultar(entidade);
        }
        */
        this.state={
            id:0
           ,nome:''
           ,visao:process.env.REACT_APP_VISAO_INFORMANDO
           ,mensagens:null

       };
        this.SisManterConsultar({});

    }
        
    componentDidMount()
    {
//        debugger;
        //window.drawChart();
        //this.GraficoMontar();
    }
    Salvar()
    {
        window.drawChart();
    }
    Salvar1()
    {
        let entidade =  {
        id:this.state.id
        ,nome:this.state.nome
        };

        let validar = this.Validar(entidade);

        if(validar.ok)
        {
            this.SisManterSalvar(entidade);
        }
        else
        {
            this.setState(validar.estado);
        }
    }

    Excluir()
    {
        let entidade =  {
        id:this.state.id
        };
        this.SisManterExcluir(entidade);
    }



    SisManterExcluir(entidade)
    {
        this.setState({visao:'processando'});

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/local/excluir/" + entidade.id
            ,window.getCabeca())
            .then((resposta)=>this.Excluiu(resposta))
            .catch((resposta => this.Excluiu(resposta))
            );

    }

    Excluiu(resposta)
    {      
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
    
        this.Evento(retorno, 'excluiu');
}

    Evento(resposta, acao)
    {        
        if(acao=='pesquisou' 
            || acao=='consultou'
            || acao=='salvou'
            || acao=='excluiu'
            )
        {
        }


        if(acao=='salvou')
        {
            this.setState({visao:resposta.visao, mensagens:resposta.mensagens});
        }
        else if(acao =='consultou')
        {
/*
            let estado={
                id:resposta.entidade.id
               ,nome:resposta.entidade.nome
               ,visao:process.env.REACT_APP_VISAO_INFORMANDO
            };
*/            
            //this.setState(estado);

            debugger;

            this.GraficoMontar(resposta.entidadePesquisa);
        }
        else if(acao =='excluiu')
        {
            this.setState({visao:resposta.visao, mensagens:resposta.mensagens});
        }

    }

    SisManterSalvar(entidade)
    {
        this.setState({visao:'processando'});

        if(entidade.id==0)
        {
            axios.post(process.env.REACT_APP_SERVER_URL + "/api/local/salvar"
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
        else
        {
            axios.post(process.env.REACT_APP_SERVER_URL + "/api/local/salvar"
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
    }

    GraficoMontar(entidade)
    {
        let entidade_ = [
            {id:0, nome:'frutas', quantidade:10}
            ,{id:0, nome:'verduras', quantidade:90}
        ];

        debugger;

        if(entidade != null){entidade_ = entidade;}

        let titulo_ ='Estoque por Classe';

        let linhas_ = [];

        entidade_.map((e) =>
            {
                linhas_.push([e.classeNome, e.estoqueQuantidade]);
            }

        );
        window.drawChart({titulo: titulo_
        ,linhas: linhas_
        });

    }

    Salvou(resposta)
    {
        
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

        this.Evento(retorno, 'salvou');

    }


    SisManterConsultar(entidade)
    {

        let url = '/api/info/pesquisarEstoquePorClasse?nome';

        axios.get(process.env.REACT_APP_SERVER_URL + url // "/api/local/consultar/" + entidade.id
            ,window.getCabeca()
            )
            .then((resposta)=>this.Consultou(resposta))
            .catch((resposta) => this.Consultou(resposta));
    }

    Consultou(resposta)
    {
        debugger;

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
                    //,entidadePesquisa:resposta.data.dados
                    ,entidadePesquisa:resposta.data.dadosLista
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


        //this.props.OnEvento(retorno, 'consultou');
        this.Evento(retorno, 'consultou');
    }

    Validar(entidade)
    {
        let validar = {ok:true, mensagens:[]};
        let retorno = {};

        if(entidade.nome.length == 0)
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Informe o nome.")
            };
            validar = {ok:false, estado:retorno};
            return validar;
        }

        if(entidade.nome.length < 3)
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Informe ao menos 3 caracteres no nome.")
            };
            validar = {ok:false, estado:retorno};
            return validar;
        }
        return validar;

    }

    render()
    {
        return(

<div class="card">
  <div class="card-header">
    {"ESTOQUE POR CLASSE"}
  </div>
  <div class="card-body">

  <fieldset>

        <div class="form-group">


        <div id="chartdiv" onload1='drawChart()'>  chart </div>

            <SisMensagemView
                visao={this.state.visao}
                mensagens={this.state.mensagens}
                OnClicou={(v) => this.setState({visao:v})}
            />

            {this.state.visao=='processando' ?
                <div class="text-center">
                    <div class="spinner-border" role="status">
                    </div>
                </div>
            : ""
            }

        </div>

        {/* <FormBotoes
            id={this.props.entidade.id} 
            listaAutorizacao={this.props.listaAutorizacao}
            objetoAutorizacao={this.props.objetoAutorizacao}
            processando={this.props.processando}
            OnExcluir={() => this.Excluir()}
            OnSalvar={() => this.Salvar()}
            OnVoltar={() => this.props.OnVoltar()}
        /> */}


    </fieldset>

  </div>
</div>
                            
        );
    
    }

}


export default PainelForm;

/*

https://ifrs-dev2-buyer.herokuapp.com/api/info/pesquisarEstoquePorClasse?nome
http://localhost:8080/api/info/pesquisarEstoquePorClasse?nome
https://newbedev.com/how-to-use-onload-in-react
https://developers.google.com/chart/interactive/docs/basic_draw_chart
*/