<?php
class Goods_categoryAction extends CommonAction {
	
	
	
	public function _filter(&$map)
	{
		if(isset($map['pid'])){
			$currentGoods_categoryId = $map['pid'];
			S('currentGoods_categoryId',$currentGoods_categoryId);
		}else{
			$currentGoods_categoryId = S('currentGoods_categoryId');
			$map['pid'] = $currentGoods_categoryId = $currentGoods_categoryId?$currentGoods_categoryId:0;
			if($_REQUEST['nav'] == 'back' && $map['pid']){
				$model	=	D("Goods_category");
				$backdata = $model->find($map['pid']);
				$map['pid'] = $currentGoods_categoryId = $backdata['pid'];
				S('currentGoods_categoryId',$currentGoods_categoryId);
			}else if($_REQUEST['_']){
				$map['pid'] = $currentGoods_categoryId = 0;
				S('currentGoods_categoryId',$currentGoods_categoryId);
			}
		}
		
		if(!empty($map['name'])){
  			$map['name'] = array('like',"%{$map['name']}%");
  		}
  		
  		if($map['pid']){
  			$model	=	D("Goods_category");
  			$model->getById($map['pid']);
  			$path = $model->path;
  			$path_arr = explode(',', $path);
  			$path_str = '/';
  			foreach($path_arr as $value){
  				if($value){
	  				$modeldata = $model->find($value);
	  				if($modeldata){
	  					$path_str .= $modeldata['name'].'/';
	  				}
  				}
  				unset($modeldata);
  			}
  			$this->assign('path_str',$path_str);
  		}
  		
  		if(empty ( $_REQUEST ['_order'] )){
  			$_REQUEST ['_order'] = 'id';
  			$_REQUEST ['_sort'] = 'asc';
  		}
	}

	// 获取配置类型
	public function _before_add() {
		$model	=	D("Goods_category");
		$id = intval($_REQUEST['id']);
		if(empty($id)){
			$id = S('currentGoods_categoryId');
		}
		$model->getById($id);
		$map['level'] = array('eq',$model->level);
		$list	=	$model->where($map)->order('`sort` asc')->select();
		$this->assign('list',$list);
        $this->assign('pid',$model->id);
		$this->assign('level',$model->level+1);
	}	

	public function _before_edit() {
		$model	=	D("Goods_category");
		$id = intval($_REQUEST['id']);
		if(empty($id)){
			$id = S('currentGoods_categoryId');
			$model->getById($id);
			$map['level'] = array('eq',$model->level);
		}else{
			$model->getById($id);
			$map['level'] = array('eq',$model->level - 1);
		}
		$list	=	$model->where($map)->order('`sort` asc')->select();
		$this->assign('list',$list);
	}
	
	public function foreverdelete() {
		//删除指定记录
		$name=$this->getActionName();
		$model = D ($name);
		if (! empty ( $model )) {
			$id = $_REQUEST ['id'];
			if (isset ( $id )) {
				$arr = explode ( ',', $id );
				foreach($arr as &$value){
					$value = "LOCATE(',{$value},',`path`) > 0";
				}
				$arr[] = "`id` in('{$id}')";
				$condition['_string'] = implode(' or ', $arr);
				if (false !== $model->where ( $condition )->delete ()) {
					//echo $model->getlastsql();
					$this->success ('删除成功！');
				} else {
					$this->error ('删除失败！');
				}
			} else {
				$this->error ( '非法操作' );
			}
		}
		$this->forward ();
	}
	
	public function _before_foreverdelete(){
		$name=$this->getActionName();
		$model = D ($name);
		if(! empty ( $model )){
			$id = $_REQUEST ['id'];
			if (isset ( $id )) {
				$arr = explode ( ',', $id );
				$map = array(
					'id'=>array('in',$arr),
					'type'=>array('eq',1),
				);
				$data = $model->where($map)->find();
				if(!empty($data)){
					$this->error($data['name'].'为系统内置分类不可删除');
				}
				
				$goods = D('Goods');
				$goodsmap['cid'] = array('in',$arr);
				$goodsdata = $goods->where($goodsmap)->find();
				if(!empty($goodsdata)){
					$cname = getParent($name,$goodsdata['cid'],'name');
					$this->error($cname.' 分类下有商品不可删除');
				}
			}else{
				$this->error('参数错误');
			}
		}
	}
	
	public function tree(){
		$name=$this->getActionName();
		$model	=	D($name);
		$data = $model->order('`path`')->findAll();
		$this->assign('data',$data);
		$this->display();
	}

}
?>