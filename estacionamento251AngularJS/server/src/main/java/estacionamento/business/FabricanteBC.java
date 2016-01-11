/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package estacionamento.business;

import br.gov.frameworkdemoiselle.stereotype.BusinessController;
import br.gov.frameworkdemoiselle.template.DelegateCrud;
import estacionamento.entity.Fabricante;
import estacionamento.entity.User;
import estacionamento.persistence.FabricanteDAO;
import java.util.List;

/**
 *
 * @author gladson
 */
@BusinessController
public class FabricanteBC extends DelegateCrud<Fabricante, Long, FabricanteDAO> {

    /**
     *
     * @return
     */
    public Long count() {
        return getDelegate().count();
    }

    /**
     *
     * @param field
     * @param order
     * @param init
     * @param qtde
     * @return
     */
    public List list(String field, String order, int init, int qtde) {
        return getDelegate().list(field, order, init, qtde);
    }

    public List<Fabricante> listaModelos(String fabricante) {
        return getDelegate().listaModelos(fabricante);
    }

}