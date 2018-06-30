<?php
/**
 *
 * @category   Ceicom
 * @package   Ceicom_EbitIntegration
 * @author      Suporte <suporte@ceicom.com.br>
 * @website    http://www.ceicom.com.br
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */


class Ceicom_Ebitintegration_Block_Pagamentos extends Mage_Adminhtml_Block_System_Config_Form_Field_Array_Abstract
{
    public function __construct()
    {
        $this->addColumn('payment_method', array('label' => Mage::helper('adminhtml')->__('Nome do método pagamento'),
                                             'style' => 'width:120px' ));

        $this->addColumn('id_payment_method', array('label' => Mage::helper('adminhtml')->__('Id do método pagamento'),
                                        'style' => 'width:120px' ));

        $this->_addAfter       = false;
        $this->_addButtonLabel = Mage::helper('adminhtml')->__('Add regra');

        parent::__construct();
    }
}


 ?>
