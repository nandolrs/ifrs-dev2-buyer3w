import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'

class LocalEnderecoMapa extends React.Component
{
    constructor(props)
    {
        super(props);

    }

    render()
    {
        return(
            <div>
                {this.props.serLocalizado == null || ( this.props.serLocalizado != null && this.props.serLocalizado=='1') ?
                    <button id='inputQueroSerLocalizado'  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => window.CoordenadasObterParaInteresse() }> Quero ser localizado </button>
                    : 
                    ''
                }
                <button id='inputMapaAbrir'  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => window.MapaAbrir({latitude:this.props.latitude, longitude:this.props.longitude}) }> Mapa </button>
            </div>

        );
    }
}

export default LocalEnderecoMapa;

