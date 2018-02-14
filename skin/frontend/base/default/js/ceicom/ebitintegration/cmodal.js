

// $j( document ).ready(function() {
// 	$jj.each($jj('.wrapper-cmodal').data(), function (index, value) {
// 	      alert('"' + index + '":"' + value + '",');
// 	});

// });
//
if (!sessionStorage.getItem('popup')) {
	$j( document ).ready(function() {
		function cModal(wrapper) {
			this.body = $j('body');
		}

	    cModal.prototype.init = function ($jel) {
	        var _ = this,
	            keepDoing = true,
	            classe;

	        if (!$jel.parent().hasClass('cfw-modal__conteudo')) initLayout();

	        _.type = $jel.attr('data-modal-type');

	        if (_.type == 'img') {
	            _.wrapper = $j('.cfw-modal.for-img');

	            var img = $jel.attr('href') || $jel.attr('data-modal-img') || null,
	                link = $jel.attr('data-modal-url') || null,
	                classe = $jel.attr('data-modal-class');

	            //

	            var content = '';

	            if (img){
	                var title = $jel.attr('title') ? ' title="' + $jel.attr('title') + '" ' : '';

	                content += '<img ' + title + ' src="' + img + '" />';

	                if (link)
	                    content = '<a ' + _.dealLink(link) + '>' + content + '</a>';

	                content += '<button class="cfw-modal__close-btn js-close-modal" type="button" title="Fechar"></button>';

	                _.wrapper.html(content);
	            }
	            else
	                keepDoing = false;
	        }

	        if (_.type == 'txt') {
	            var item = $jel.attr('data-modal'),
	                $jitem = $j(checkIdClass(item)),
	                classe = $jel.attr('data-modal-class') || $jitem.attr('data-modal-class');

	            _.wrapper = $jitem.closest('.cfw-modal');

	            if ($jel.attr('data-modal-width')) _.wrapper.find('.cfw-modal__pos-conteudo').css('max-width', $jel.attr('data-modal-width') + 'px');

	            if ($jel.attr('title'))
	                _.wrapper.find('.cfw-modal__pos-conteudo').attr('title');
	        }

	        _.wrapper
	            .addClass(classe)
	            .on('close', function () {
	                _.close();
	            });

	        return keepDoing ? _.open($jel) : false;
	    }

	    cModal.prototype.dealLink = function (link) {
	        var prelink = link.indexOf('@') > 0 ? 'href="mailto:' : 'href="//';
	        var aftlink = link.indexOf('@') < 0 ? 'target="_blank"' : '';
	        return (link) ? prelink + link.replace(/^[http]+s?:\/\//gi, '') + '"' + aftlink : '';
	    }

	    cModal.prototype.open = function ($jel) {
	        var _ = this;
	        var bodyClass = 'modal-loaded';

	        if ($jel.attr('data-modal-lock') != 'false') bodyClass += ' modal-open';

	        _.wrapper.fadeIn('fast', function () {
	            _.body.addClass(bodyClass);
	            $j(window).trigger('cfw-modal-open');
	        });

	        return this;
	    }

	    cModal.prototype.close = function () {
	        var _ = this;

	       	if($j('#not-show-popup').is(':checked'))
	    		window.sessionStorage.setItem('popup', 'close');


	        var classe = _.type == 'img' ? 'cfw-modal for-img' :
	                     _.type == 'txt' ? 'cfw-modal' : '';

	        _.wrapper.fadeOut('fast', function () {
	            _.body.removeClass('modal-open modal-loaded');
	            _.wrapper.off('close callClose');

	            if (_.type == 'img')
	                _.wrapper
	                    .removeAttr('class')
	                    .addClass(classe);

	            $j(window).trigger('cfw-modal-close');
	        });

	        return this;
	    }

	    /**********************************/

	    function checkIdClass(nome) {
	        return nome ? (nome.charAt(0) != '#' && nome.charAt(0) != '.') ? '#' + nome : nome : null;
	    }

	    /**********************************/

	    function initLayout() {
	        $j('[data-modal]').each(function () {
	        	console.info('data-modal')

	            var formatosImagem = ['jpg', 'peg', 'png', 'gif', 'bmp'];
	            var type = 'txt';
	            var img = $j(this).attr('href') || $j(this).attr('data-modal-img');
	            if(img) type = $j.inArray(img.slice(-3), formatosImagem) >= 0 ? 'img' : 'txt';

	            $j(this).attr('data-modal-type', type);

	            //if ($j(this).attr('data-auto-modal') && !aModal) aModal = $j(this);

	            if (type == 'txt') {
	                var $jel = $j(checkIdClass($j(this).attr('data-modal')));

	                if(!$jel.parent().hasClass('cfw-modal__conteudo'))
	                    $jel
	                        .wrap('<div class="cfw-modal" hidden></div>')
	                        .wrap('<div class="cfw-modal__pos-conteudo"></div>')
	                        .wrap('<div class="cfw-modal__conteudo"></div>')
	                        .attr('hidden', false)
	                        .closest('.cfw-modal__pos-conteudo').append('<button class="cfw-modal__close-btn js-close-modal" type="button" title="Fechar"></button>')
	                        .parent().find('iframe').each(function () {
	                            $j(this).attr('src', $j(this).attr('data-src'));
	                        });
	            }

	            if (type == 'img' && !$j('.cfw-modal.for-img').length) {
	                $j('body').append('<div class="cfw-modal for-img" hidden></div>');
	            }
	        });
	    }

	    initLayout();

	    /**********************************/

	    var form = new cModal();

	    $j(document).on('click', '[data-modal]', function (e) {
	        e.preventDefault();
	        form.init($j(this));
	    });

	    $j(document).on('click', function (e) {
	        var $jel = $j(e.target);

	        var close = $jel.hasClass('js-close-modal') ? true :
	                    !$jel.closest('.cfw-modal__conteudo').length && !$jel.closest('.sweet-alert').length ? true : false;

	        if (close && !$j('body').hasClass('modal-loaded')) close = false;

	        if ($j('.cfw-modal:visible').length && close) $j('.cfw-modal:visible').trigger('close');
	    });

	    $j(document).on('keyup', function (e) {
	        if ($j('.cfw-modal:visible').length && e.keyCode == 27) $j('.cfw-modal:visible').trigger('close');
	    });

	    if ($j('[data-modal][data-auto-modal]').length)
	        $j('[data-modal][data-auto-modal]').trigger('click');

	});
}
